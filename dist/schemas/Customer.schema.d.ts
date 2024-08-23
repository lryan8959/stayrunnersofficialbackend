import mongoose from "mongoose";
import { City } from "./City.schema";
export declare class Customer {
    name: string;
    city: City;
    email: string;
    created_at: Date;
    updated_at: Date;
}
export declare const CustomerSchema: mongoose.Schema<Customer, mongoose.Model<Customer, any, any, any, mongoose.Document<unknown, any, Customer> & Customer & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Customer, mongoose.Document<unknown, {}, mongoose.FlatRecord<Customer>> & mongoose.FlatRecord<Customer> & {
    _id: mongoose.Types.ObjectId;
}>;
