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
exports.RoomsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Room_schema_1 = require("../schemas/Room.schema");
let RoomsService = class RoomsService {
    constructor(roomModel) {
        this.roomModel = roomModel;
    }
    async createRoom(id, filenames, createRoomDto) {
        createRoomDto.localhost = id;
        createRoomDto.pic_urls = filenames;
        const newRoom = new this.roomModel(createRoomDto);
        return await newRoom.save();
    }
    async updateRoom(id, room_id, filenames, updateRoomDto) {
        const room = await this.roomModel
            .findOne({
            _id: room_id,
            localhost: id,
            deleted: false,
        })
            .exec();
        if (!room) {
            return 'Room not found';
        }
        if (filenames?.length > 0) {
            room.pic_urls = filenames;
        }
        room.description = updateRoomDto.description;
        room.available = true;
        room.payment_option = updateRoomDto.payment_option;
        room.min_price_per_night = updateRoomDto.min_price_per_night;
        room.city = updateRoomDto.city;
        room.billing = updateRoomDto.billing;
        room.updated_at = new Date();
        const updated = await room.save();
        if (updated)
            return room_id;
        return false;
    }
    async getLocalhostRooms(id) {
        const rooms = this.roomModel
            .find({ localhost: id, deleted: false })
            .populate('city');
        return rooms;
    }
    async getLocalhostRoomsDetails(city_id, localhost) {
        const rooms = this.roomModel
            .find({
            localhost: localhost,
            available: true,
            city: city_id,
            deleted: false,
        })
            .populate('city');
        return rooms;
    }
    async getLocalhostRoomsForCustomer(id) {
        const rooms = this.roomModel
            .find({ localhost: id, available: true, deleted: false })
            .populate('city');
        return rooms;
    }
};
exports.RoomsService = RoomsService;
exports.RoomsService = RoomsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Room_schema_1.Room.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RoomsService);
//# sourceMappingURL=rooms.service.js.map