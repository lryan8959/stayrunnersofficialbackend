import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Localhost } from 'src/schemas/Localhost.schema';
import { CreateLocalhostDto } from './dtos/CreateLocalhost.dto';
import { VerifyLocalhostDto } from './dtos/VerifyLocalhost.dto';
import { RoomRequests } from 'src/schemas/RoomRequests.schema';
import { Room } from 'src/schemas/Room.schema';
import { EmailService } from 'src/utils/EmailService';
import { ForgotPasswordLocalhostDto } from './dtos/ForgotPasswordLocalhost.dto';
import { Customer } from 'src/schemas/Customer.schema';
import { Bid } from 'src/schemas/Bid.schema';
export declare class LocalhostsService {
    private jwtService;
    private localhostModel;
    private roomRequestsModel;
    private roomModel;
    private customerModel;
    private bidModel;
    private emailService;
    constructor(jwtService: JwtService, localhostModel: Model<Localhost>, roomRequestsModel: Model<RoomRequests>, roomModel: Model<Room>, customerModel: Model<Customer>, bidModel: Model<Bid>, emailService: EmailService);
    createLocalhost(createLocalhostDto: CreateLocalhostDto): Promise<"Email already exists" | {
        _id: import("mongoose").Types.ObjectId;
        code_verified: boolean;
    }>;
    forgotPasswordLocalhost(forgotPasswordLocalhostDto: ForgotPasswordLocalhostDto): Promise<"Email does not exist" | {
        _id: import("mongoose").Types.ObjectId;
        code_verified: boolean;
    }>;
    verifyLocalhost(id: any, verifyLocalhostDto: VerifyLocalhostDto): Promise<"Local does not exist" | "Code already verified" | "Verification code is incorrect" | "Verification code has expired" | {
        _id: import("mongoose").Types.ObjectId;
        name: string;
        code_verified: boolean;
        password: string;
    }>;
    resendVerificationCode(id: any): Promise<"Local does not exist" | "Code already verified" | {
        _id: import("mongoose").Types.ObjectId;
        code_verified: boolean;
    }>;
    acceptRoomRequest(id: any, localhost: any): Promise<false | "We Apologize, this Order is no Longer Available." | "Request already accepted" | {
        bid: any;
        accepted: boolean;
        roomsCount: number;
        rooms: any[];
    }>;
    changeRoomAvailability(id: any, localhost: any): Promise<boolean | "Room not found">;
    deleteRoom(id: any, localhost: any): Promise<boolean | "Room not found">;
    getRoom(id: any, localhost: any): Promise<(import("mongoose").Document<unknown, {}, Room> & Room & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Room not found">;
    getMyProfile(localhost: any): Promise<"User not found" | {
        _id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        city: import("../schemas/City.schema").City;
    }>;
    updateProfile(localhost: any, data: any): Promise<false | "User not found" | {
        localhost: any;
    }>;
    changePassword(localhost: any, data: any): Promise<false | "User not found" | {
        localhost: any;
    }>;
    ResetPassword(localhost: any, password: any): Promise<false | "User not found" | {
        localhost: any;
    }>;
}
