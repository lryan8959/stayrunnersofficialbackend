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
exports.LocalhostsService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Localhost_schema_1 = require("../schemas/Localhost.schema");
const bcrypt_1 = require("../utils/bcrypt");
const RoomRequests_schema_1 = require("../schemas/RoomRequests.schema");
const Room_schema_1 = require("../schemas/Room.schema");
const EmailService_1 = require("../utils/EmailService");
const Customer_schema_1 = require("../schemas/Customer.schema");
const Bid_schema_1 = require("../schemas/Bid.schema");
let LocalhostsService = class LocalhostsService {
    constructor(jwtService, localhostModel, roomRequestsModel, roomModel, customerModel, bidModel, emailService) {
        this.jwtService = jwtService;
        this.localhostModel = localhostModel;
        this.roomRequestsModel = roomRequestsModel;
        this.roomModel = roomModel;
        this.customerModel = customerModel;
        this.bidModel = bidModel;
        this.emailService = emailService;
    }
    async createLocalhost(createLocalhostDto) {
        const email = createLocalhostDto.email;
        const findByEmail = await this.localhostModel.findOne({ email }).exec();
        if (findByEmail && findByEmail.code_verified) {
            return 'Email already exists';
        }
        if (findByEmail && !findByEmail.code_verified) {
            const verificationcode = Math.floor(100000 + Math.random() * 900000);
            findByEmail.verification_code = verificationcode;
            findByEmail.verification_code_created_at = new Date();
            await findByEmail.save();
            const sent = await this.emailService.sendEmail(email, 'Last Minute Booking Email Verification Alert', `<!DOCTYPE html>
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
                <p>Your email verification code is: <strong>${verificationcode}</strong></p>
                <p>Please use this code to verify your email address. The code will expire in 10 minutes.</p>
                <p>If you did not request this verification code, you can safely ignore this email.</p>
                <p>Thank you!</p>
            </div>
        </body>
        </html>
        `);
            console.log('EMAIL SENT', sent);
            return { _id: findByEmail._id, code_verified: false };
        }
        const verificationcode = Math.floor(100000 + Math.random() * 900000);
        createLocalhostDto.verification_code = verificationcode;
        const Pass = await (0, bcrypt_1.hashPassword)(createLocalhostDto.password);
        createLocalhostDto.password = Pass;
        const createdLocalhost = new this.localhostModel(createLocalhostDto);
        const savedUser = await createdLocalhost.save();
        const { _id, code_verified } = savedUser;
        if (savedUser) {
            await this.emailService.sendEmail(email, 'Last Minute Booking Email Verification Alert', `<!DOCTYPE html>
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
                    <p>Your email verification code is: <strong>${verificationcode}</strong></p>
                    <p>Please use this code to verify your email address. The code will expire in 10 minutes.</p>
                    <p>If you did not request this verification code, you can safely ignore this email.</p>
                    <p>Thank you!</p>
                </div>
            </body>
            </html>
            `);
            return { _id, code_verified };
        }
    }
    async forgotPasswordLocalhost(forgotPasswordLocalhostDto) {
        const email = forgotPasswordLocalhostDto.email;
        const findByEmail = await this.localhostModel.findOne({ email }).exec();
        if (!findByEmail) {
            return 'Email does not exist';
        }
        const verificationcode = Math.floor(100000 + Math.random() * 900000);
        findByEmail.verification_code = verificationcode;
        findByEmail.verification_code_created_at = new Date();
        findByEmail.code_verified = false;
        findByEmail.password = undefined;
        await findByEmail.save();
        await this.emailService.sendEmail(email, 'Last Minute Booking Email Verification Alert', `<!DOCTYPE html>
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
                <p>Your email verification code is: <strong>${verificationcode}</strong></p>
                <p>Please use this code to verify your email address. The code will expire in 10 minutes.</p>
                <p>If you did not request this verification code, you can safely ignore this email.</p>
                <p>Thank you!</p>
            </div>
        </body>
        </html>
        `);
        return { _id: findByEmail._id, code_verified: false };
    }
    async verifyLocalhost(id, verifyLocalhostDto) {
        const { verification_code } = verifyLocalhostDto;
        const localhost = await this.localhostModel.findById(id).exec();
        if (!localhost) {
            return 'Local does not exist';
        }
        if (localhost.code_verified) {
            return 'Code already verified';
        }
        if (localhost.verification_code !== verification_code) {
            return 'Verification code is incorrect';
        }
        const currentTime = new Date();
        const expirationTimeInMinutes = 10;
        const expirationTime = new Date(localhost.verification_code_created_at.getTime() +
            expirationTimeInMinutes * 60000);
        if (currentTime > expirationTime) {
            return 'Verification code has expired';
        }
        if (localhost?.password) {
            localhost.code_verified = true;
            localhost.code_verified_at = new Date();
            await localhost.save();
            return {
                _id: localhost._id,
                name: localhost.name,
                code_verified: true,
                password: "",
            };
        }
        else {
            localhost.code_verified = true;
            localhost.code_verified_at = new Date();
            await localhost.save();
            return {
                _id: localhost._id,
                name: localhost.name,
                code_verified: true,
                password: undefined
            };
        }
    }
    async resendVerificationCode(id) {
        const localhost = await this.localhostModel.findById(id).exec();
        if (!localhost) {
            return 'Local does not exist';
        }
        if (localhost?.code_verified) {
            return 'Code already verified';
        }
        const verificationcode = Math.floor(100000 + Math.random() * 900000);
        localhost.verification_code = verificationcode;
        localhost.verification_code_created_at = new Date();
        await localhost.save();
        await this.emailService.sendEmail(localhost.email, 'Last Minute Booking Email Verification Alert', `<!DOCTYPE html>
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
                    <p>Your email verification code is: <strong>${verificationcode}</strong></p>
                    <p>Please use this code to verify your email address. The code will expire in 10 minutes.</p>
                    <p>If you did not request this verification code, you can safely ignore this email.</p>
                    <p>Thank you!</p>
                </div>
            </body>
            </html>
            `);
        return { _id: localhost._id, code_verified: false };
    }
    async acceptRoomRequest(id, localhost) {
        const Isdealed = await this.roomRequestsModel
            .findOne({
            bid: id,
            dealed: true,
        })
            .exec();
        if (Isdealed) {
            return 'We Apologize, this Order is no Longer Available.';
        }
        const IsAvailable = await this.roomRequestsModel
            .findOne({
            bid: id,
            localhost: localhost,
            accepted: false,
        })
            .exec();
        if (!IsAvailable) {
            return 'Request already accepted';
        }
        IsAvailable.accepted = true;
        IsAvailable.accepted_at = new Date();
        const accepted = await IsAvailable.save();
        let rooms = [];
        if (accepted) {
            rooms = await this.roomModel
                .find({
                localhost: localhost,
                available: true,
            })
                .exec();
            const customerBid = await this.bidModel
                .findOne({
                _id: id,
            })
                .exec();
            const customer = await this.customerModel
                .findOne({
                _id: customerBid.customer,
            })
                .exec();
            let localh = await this.localhostModel
                .findOne({
                _id: localhost,
            })
                .exec();
            const payload = {
                userRole: 'customer',
                bid: id,
                localhost,
            };
            const accessToken = this.jwtService.sign(payload);
            this.emailService.sendEmail(customer.email, 'A New Room Request - Last Minute Booking', `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Request Accepted</title>
          </head>
          <body>
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h2>Request Accepted</h2>
                  <p>Hello,</p>
                  <p>A Last Minute Local Host has accepted 
                  your Request:</p>
                  <ul>
                      <li><strong>Localhost Name:</strong> ${localh.name}</li>
                  </ul>
                  <a href="https://m59media.com/customer/negotiate?token=${accessToken}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none;">Negotiate</a>
                  <p>If you have any questions or concerns, please contact us.</p>
                  <p>Thank you!</p>
              </div>
          </body>
          </html>

        `);
            return { bid: id, accepted: true, roomsCount: rooms.length, rooms };
        }
        return false;
    }
    async changeRoomAvailability(id, localhost) {
        const room = await this.roomModel
            .findOne({
            _id: id,
            localhost,
        })
            .exec();
        if (!room) {
            return 'Room not found';
        }
        room.available = !room.available;
        room.updated_at = new Date();
        const roomSaved = await room.save();
        if (roomSaved) {
            return true;
        }
        return false;
    }
    async deleteRoom(id, localhost) {
        const room = await this.roomModel
            .findOne({
            _id: id,
            localhost,
            deleted: false,
        })
            .exec();
        if (!room) {
            return 'Room not found';
        }
        room.deleted = true;
        room.deleted_at = new Date();
        const roomSaved = await room.save();
        if (roomSaved) {
            return true;
        }
        return false;
    }
    async getRoom(id, localhost) {
        const room = await this.roomModel
            .findOne({
            _id: id,
            localhost,
            deleted: false,
        })
            .exec();
        if (!room) {
            return 'Room not found';
        }
        return room;
    }
    async getMyProfile(localhost) {
        const user = await this.localhostModel
            .findOne({
            _id: localhost,
            code_verified: true,
        })
            .exec();
        if (!user) {
            return 'User not found';
        }
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            city: user.city,
        };
    }
    async updateProfile(localhost, data) {
        const user = await this.localhostModel
            .findOne({
            _id: localhost,
            code_verified: true,
        })
            .exec();
        if (!user) {
            return 'User not found';
        }
        user.name = data.name;
        user.city = data.city;
        user.updated_at = new Date();
        const saved = await user.save();
        if (saved) {
            return { localhost };
        }
        return false;
    }
    async changePassword(localhost, data) {
        const user = await this.localhostModel
            .findOne({
            _id: localhost,
            code_verified: true,
        })
            .exec();
        if (!user) {
            return 'User not found';
        }
        const hashedPassword = (0, bcrypt_1.hashPassword)(data.password);
        user.password = hashedPassword;
        user.updated_at = new Date();
        const saved = await user.save();
        if (saved) {
            return { localhost };
        }
        return false;
    }
    async ResetPassword(localhost, password) {
        const user = await this.localhostModel
            .findOne({
            _id: localhost,
            code_verified: true,
        })
            .exec();
        if (!user) {
            return 'User not found';
        }
        const hashedPassword = (0, bcrypt_1.hashPassword)(password);
        user.password = hashedPassword;
        user.updated_at = new Date();
        const saved = await user.save();
        if (saved) {
            return { localhost };
        }
        return false;
    }
};
exports.LocalhostsService = LocalhostsService;
exports.LocalhostsService = LocalhostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(Localhost_schema_1.Localhost.name)),
    __param(2, (0, mongoose_1.InjectModel)(RoomRequests_schema_1.RoomRequests.name)),
    __param(3, (0, mongoose_1.InjectModel)(Room_schema_1.Room.name)),
    __param(4, (0, mongoose_1.InjectModel)(Customer_schema_1.Customer.name)),
    __param(5, (0, mongoose_1.InjectModel)(Bid_schema_1.Bid.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        EmailService_1.EmailService])
], LocalhostsService);
//# sourceMappingURL=localhosts.service.js.map