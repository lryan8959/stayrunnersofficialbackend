import mongoose from "mongoose";
import { Customer } from "./Customer.schema";
import { Room } from "./Room.schema";
export declare class Booking {
    customer: Customer;
    room: Room;
    payment: number;
    created_at: Date;
}
export declare const BookingSchema: mongoose.Schema<Booking, mongoose.Model<Booking, any, any, any, mongoose.Document<unknown, any, Booking> & Booking & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Booking, mongoose.Document<unknown, {}, mongoose.FlatRecord<Booking>> & mongoose.FlatRecord<Booking> & {
    _id: mongoose.Types.ObjectId;
}>;
