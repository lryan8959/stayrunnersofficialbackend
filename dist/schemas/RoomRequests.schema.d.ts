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
