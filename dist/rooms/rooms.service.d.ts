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
