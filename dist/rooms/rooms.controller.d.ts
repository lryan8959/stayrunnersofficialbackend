import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { Request } from 'express';
import { RoomsService } from './rooms.service';
import { UpdateRoomDto } from './dtos/UpdateRoomDto.dto';
export declare class RoomsController {
    private roomsService;
    constructor(roomsService: RoomsService);
    addRoom(req: Request, createRoomDto: CreateRoomDto, files: Array<Express.Multer.File>, res: any): Promise<any>;
    editRoom(req: Request, updateRoomDto: UpdateRoomDto, room_id: string, files: Array<Express.Multer.File>, res: any): Promise<any>;
    getLocalhostRooms(req: Request, res: any): Promise<any>;
    getLocalhostRoomsForCustomer(city_id: string, localhost: string, res: any): Promise<any>;
    getLocalhostAvailableRooms(req: Request, res: any): Promise<any>;
}
