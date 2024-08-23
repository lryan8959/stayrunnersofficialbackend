import mongoose from "mongoose";
import { Bid } from "./Bid.schema";
import { Localhost } from "./Localhost.schema";
export declare class RoomRequests {
    bid: Bid;
    localhost: Localhost;
    accepted: boolean;
    accepted_at: Date;
    dealed: boolean;
    dealed_at: Date;
    created_at: Date;
}
export declare const RoomRequestsSchema: mongoose.Schema<RoomRequests, mongoose.Model<RoomRequests, any, any, any, mongoose.Document<unknown, any, RoomRequests> & RoomRequests & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RoomRequests, mongoose.Document<unknown, {}, mongoose.FlatRecord<RoomRequests>> & mongoose.FlatRecord<RoomRequests> & {
    _id: mongoose.Types.ObjectId;
}>;
