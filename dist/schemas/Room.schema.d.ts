import { City } from "./City.schema";
import mongoose from "mongoose";
import { Localhost } from "./Localhost.schema";
export declare class Room {
    localhost: Localhost;
    pic_urls: string[];
    description: string;
    available: boolean;
    payment_option: string;
    min_price_per_night: number;
    city: City;
    billing: string;
    deleted: boolean;
    deleted_at: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const RoomSchema: mongoose.Schema<Room, mongoose.Model<Room, any, any, any, mongoose.Document<unknown, any, Room> & Room & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Room, mongoose.Document<unknown, {}, mongoose.FlatRecord<Room>> & mongoose.FlatRecord<Room> & {
    _id: mongoose.Types.ObjectId;
}>;
