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
import { Customer } from "./Customer.schema";
export declare class Bid {
    customer: Customer;
    beds: number;
    people: number;
    nights: number;
    price_willing_to_pay: number;
    special_instructions: string;
    bid_status: string;
    created_at: Date;
    updated_at: Date;
}
export declare const BidSchema: mongoose.Schema<Bid, mongoose.Model<Bid, any, any, any, mongoose.Document<unknown, any, Bid> & Bid & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Bid, mongoose.Document<unknown, {}, mongoose.FlatRecord<Bid>> & mongoose.FlatRecord<Bid> & {
    _id: mongoose.Types.ObjectId;
}>;
