/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Room } from 'src/schemas/Room.schema';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { UpdateRoomDto } from './dtos/UpdateRoomDto.dto';
export declare class RoomsService {
    private roomModel;
    constructor(roomModel: Model<Room>);
    createRoom(id: any, filenames: any, createRoomDto: CreateRoomDto): Promise<import("mongoose").Document<unknown, {}, Room> & Room & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateRoom(id: any, room_id: any, filenames: any, updateRoomDto: UpdateRoomDto): Promise<any>;
    getLocalhostRooms(id: any): Promise<(import("mongoose").Document<unknown, {}, Room> & Room & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getLocalhostRoomsDetails(city_id: any, localhost: any): Promise<(import("mongoose").Document<unknown, {}, Room> & Room & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getLocalhostRoomsForCustomer(id: any): Promise<(import("mongoose").Document<unknown, {}, Room> & Room & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
