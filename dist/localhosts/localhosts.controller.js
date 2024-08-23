"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalhostsController = void 0;
const common_1 = require("@nestjs/common");
const localhosts_service_1 = require("./localhosts.service");
const CreateLocalhost_dto_1 = require("./dtos/CreateLocalhost.dto");
const VerifyLocalhost_dto_1 = require("./dtos/VerifyLocalhost.dto");
const mongoose_1 = require("mongoose");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const EmailService_1 = require("../utils/EmailService");
const ForgotPasswordLocalhost_dto_1 = require("./dtos/ForgotPasswordLocalhost.dto");
let LocalhostsController = class LocalhostsController {
    constructor(localhostsService, emailService) {
        this.localhostsService = localhostsService;
        this.emailService = emailService;
    }
    async createLocalhost(createLocalhostDto, res) {
        console.log("createLocalhostDto--->", createLocalhostDto);
        const localhost = await this.localhostsService.createLocalhost(createLocalhostDto);
        if (localhost === 'Email already exists') {
            throw new common_1.HttpException('Email already exists', 400);
        }
        else if (localhost) {
            return res.status(201).json({
                data: localhost,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async verifyLocalhost(id, verifyLocalhostDto, res) {
        console.log("PASSWORD--->", verifyLocalhostDto);
        console.log("id--->", id);
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Local does not exist', 400);
        const verified = await this.localhostsService.verifyLocalhost(id, verifyLocalhostDto);
        if (verified === 'Verification code is incorrect') {
            throw new common_1.HttpException('Verification code is incorrect', 400);
        }
        else if (verified === 'Local does not exist') {
            throw new common_1.HttpException('Local does not exist', 400);
        }
        else if (verified === 'Code already verified') {
            throw new common_1.HttpException('Code already verified', 400);
        }
        else if (verified === 'Verification code has expired') {
            throw new common_1.HttpException('Verification code has expired', 400);
        }
        else if (verified) {
            return res.status(200).json({
                data: verified,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async resendVerificationCode(id, res) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Local does not exist', 400);
        const resent = await this.localhostsService.resendVerificationCode(id);
        if (resent === 'Local does not exist') {
            throw new common_1.HttpException('Local does not exist', 400);
        }
        else if (resent === 'Code already verified') {
            throw new common_1.HttpException('Code already verified', 400);
        }
        else if (resent) {
            return res.status(200).json({
                data: resent,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async forgotPasswordLocalhost(forgotPasswordLocalhostDto, res) {
        const localhost = await this.localhostsService.forgotPasswordLocalhost(forgotPasswordLocalhostDto);
        if (localhost === 'Email does not exist') {
            throw new common_1.HttpException('Email does not exist', 400);
        }
        else if (localhost) {
            return res.status(200).json({
                data: localhost,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async sendEmail() {
        const res = await this.emailService.sendEmail('ua92989@gmail.com', 'test subject', `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification Code</title>
      </head>
      <body>
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2>Email Verification Code</h2>
              <p>Hello,</p>
              <p>Your email verification code is: <strong>{{verificationCode}}</strong></p>
              <p>Please use this code to verify your email address. The code will expire in {{expiryTime}}.</p>
              <p>If you did not request this verification code, you can safely ignore this email.</p>
              <p>Thank you!</p>
          </div>
      </body>
      </html>
      `);
        console.log(res);
        return 'Email sent';
    }
    async acceptRequest(req, id, res) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
        if (!isValid)
            throw new common_1.HttpException('Request does not exist', 400);
        const localhost = req.user.id;
        const accepted = await this.localhostsService.acceptRoomRequest(id, localhost);
        if (accepted === 'We Apologize, this Order is no Longer Available.') {
            throw new common_1.HttpException('Request does not exist', 400);
        }
        else if (accepted === 'Request already accepted') {
            throw new common_1.HttpException('Request already accepted', 400);
        }
        else if (accepted) {
            return res.status(200).json({
                data: accepted,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async changeRoomAvailablity(req, room_id, res) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(room_id);
        if (!isValid)
            throw new common_1.HttpException('Room not found', 400);
        const localhost = req.user.id;
        const room = await this.localhostsService.changeRoomAvailability(room_id, localhost);
        if (room === 'Room not found') {
            throw new common_1.HttpException('Room not found', 400);
        }
        else if (room) {
            return res.status(200).json({
                data: room_id,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async getRoom(req, room_id, res) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(room_id);
        if (!isValid)
            throw new common_1.HttpException('Room not found', 400);
        const localhost = req.user.id;
        const room = await this.localhostsService.getRoom(room_id, localhost);
        if (room === 'Room not found') {
            throw new common_1.HttpException('Room not found', 400);
        }
        else if (room) {
            return res.status(200).json({
                data: room,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async deleteRoom(req, room_id, res) {
        const isValid = mongoose_1.default.Types.ObjectId.isValid(room_id);
        if (!isValid)
            throw new common_1.HttpException('Room not found', 400);
        const localhost = req.user.id;
        const room = await this.localhostsService.deleteRoom(room_id, localhost);
        if (room === 'Room not found') {
            throw new common_1.HttpException('Room not found', 400);
        }
        else if (room) {
            return res.status(200).json({
                data: room_id,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async chatbot(body, res) {
        console.log(body);
        const intent = body.queryResult.intent.displayName;
        return res.status(200).json({
            fulfillmentText: `Received ==${intent}== in the backend`,
        });
    }
    async myProfile(req, res) {
        const localhost = req.user.id;
        const user = await this.localhostsService.getMyProfile(localhost);
        if (user) {
            return res.status(200).json({
                data: user,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async updateProfile(req, body, res) {
        const localhost = req.user.id;
        const user = await this.localhostsService.updateProfile(localhost, body);
        if (user === 'User not found') {
            throw new common_1.HttpException('User not found', 404);
        }
        else if (user) {
            return res.status(200).json({
                data: user,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async changePassword(req, body, res) {
        const localhost = req.user.id;
        if (body.password.length < 8) {
            throw new common_1.HttpException('Password contains atleast 8 characters', 400);
        }
        if (body.password != body.confirmPassword) {
            throw new common_1.HttpException('Passwords do not match', 400);
        }
        const user = await this.localhostsService.changePassword(localhost, body);
        if (user === 'User not found') {
            throw new common_1.HttpException('User not found', 404);
        }
        else if (user) {
            return res.status(200).json({
                data: user,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async newPassword(req, body, res) {
        const user = await this.localhostsService.ResetPassword(body.localhost, body.password);
        if (user === 'User not found') {
            throw new common_1.HttpException('User not found', 404);
        }
        else if (user) {
            return res.status(200).json({
                data: user,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
};
exports.LocalhostsController = LocalhostsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateLocalhost_dto_1.CreateLocalhostDto, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "createLocalhost", null);
__decorate([
    (0, common_1.Patch)('/verify/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, VerifyLocalhost_dto_1.VerifyLocalhostDto, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "verifyLocalhost", null);
__decorate([
    (0, common_1.Patch)('/resend-verification-code/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "resendVerificationCode", null);
__decorate([
    (0, common_1.Patch)('/forgot-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ForgotPasswordLocalhost_dto_1.ForgotPasswordLocalhostDto, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "forgotPasswordLocalhost", null);
__decorate([
    (0, common_1.Get)('/send-email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "sendEmail", null);
__decorate([
    (0, common_1.Patch)('/accept-room-request/:id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "acceptRequest", null);
__decorate([
    (0, common_1.Patch)('/room-availability/:room_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('room_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "changeRoomAvailablity", null);
__decorate([
    (0, common_1.Get)('/room/:room_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('room_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "getRoom", null);
__decorate([
    (0, common_1.Delete)('/room/:room_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('room_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Post)('/chatbot'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "chatbot", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "myProfile", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Patch)('/change-password'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('/reset-new-password'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LocalhostsController.prototype, "newPassword", null);
exports.LocalhostsController = LocalhostsController = __decorate([
    (0, common_1.Controller)('localhosts'),
    __metadata("design:paramtypes", [localhosts_service_1.LocalhostsService,
        EmailService_1.EmailService])
], LocalhostsController);
//# sourceMappingURL=localhosts.controller.js.map