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
exports.RoomsController = void 0;
const common_1 = require("@nestjs/common");
const CreateRoom_dto_1 = require("./dtos/CreateRoom.dto");
const jwt_guard_1 = require("../auth/guards/jwt.guard");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const multer_1 = require("multer");
const rooms_service_1 = require("./rooms.service");
const mongoose_1 = require("mongoose");
const UpdateRoomDto_dto_1 = require("./dtos/UpdateRoomDto.dto");
let RoomsController = class RoomsController {
    constructor(roomsService) {
        this.roomsService = roomsService;
    }
    async addRoom(req, createRoomDto, files, res) {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException('At least one image is required');
        }
        const id = req.user.id;
        const filenames = files.map((file) => file.filename);
        const room = await this.roomsService.createRoom(id, filenames, createRoomDto);
        if (room) {
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                data: room,
            });
        }
        else {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async editRoom(req, updateRoomDto, room_id, files, res) {
        let filenames = [];
        if (files && files.length > 0) {
            filenames = files.map((file) => file.filename);
        }
        const id = req.user.id;
        const room = await this.roomsService.updateRoom(id, room_id, filenames, updateRoomDto);
        if (room) {
            return res.status(200).json({
                success: true,
                data: room,
            });
        }
        else {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async getLocalhostRooms(req, res) {
        const id = req.user.id;
        const rooms = await this.roomsService.getLocalhostRooms(id);
        if (rooms?.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rooms not found',
            });
        }
        else if (rooms?.length > 0) {
            return res.status(200).json({
                success: true,
                data: rooms,
            });
        }
        else {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async getLocalhostRoomsForCustomer(city_id, localhost, res) {
        const isValidCity = mongoose_1.default.Types.ObjectId.isValid(city_id);
        if (!isValidCity)
            throw new common_1.HttpException('City does not exist', 400);
        const isValidLocalhost = mongoose_1.default.Types.ObjectId.isValid(localhost);
        if (!isValidLocalhost)
            throw new common_1.HttpException('Localhost does not exist', 400);
        const rooms = await this.roomsService.getLocalhostRoomsDetails(city_id, localhost);
        if (rooms?.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rooms not found',
            });
        }
        else if (rooms?.length > 0) {
            return res.status(200).json({
                success: true,
                data: rooms,
            });
        }
        else {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
    async getLocalhostAvailableRooms(req, res) {
        const localhost = req.user.localhost;
        const rooms = await this.roomsService.getLocalhostRoomsForCustomer(localhost);
        if (rooms?.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Rooms not found',
            });
        }
        else if (rooms?.length > 0) {
            return res.status(200).json({
                success: true,
                data: rooms,
            });
        }
        else {
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};
exports.RoomsController = RoomsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                console.log(file);
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') +
                    '-' +
                    Date.now();
                const extension = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateRoom_dto_1.CreateRoomDto,
        Array, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "addRoom", null);
__decorate([
    (0, common_1.Patch)('/:room_id'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images', 10, {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                console.log(file);
                const filename = path.parse(file.originalname).name.replace(/\s/g, '') +
                    '-' +
                    Date.now();
                const extension = path.parse(file.originalname).ext;
                cb(null, `${filename}${extension}`);
            },
        }),
    })),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('room_id')),
    __param(3, (0, common_1.UploadedFiles)()),
    __param(4, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateRoomDto_dto_1.UpdateRoomDto, String, Array, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "editRoom", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getLocalhostRooms", null);
__decorate([
    (0, common_1.Get)('/:city_id/:localhost'),
    __param(0, (0, common_1.Param)('city_id')),
    __param(1, (0, common_1.Param)('localhost')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getLocalhostRoomsForCustomer", null);
__decorate([
    (0, common_1.Get)('rooms-details'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RoomsController.prototype, "getLocalhostAvailableRooms", null);
exports.RoomsController = RoomsController = __decorate([
    (0, common_1.Controller)('rooms'),
    __metadata("design:paramtypes", [rooms_service_1.RoomsService])
], RoomsController);
//# sourceMappingURL=rooms.controller.js.map