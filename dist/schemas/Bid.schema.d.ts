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
