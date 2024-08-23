import mongoose from 'mongoose';
import { City } from './City.schema';
export declare class Localhost {
    name: string;
    email: string;
    password: string;
    city: City;
    verification_code: number;
    verification_code_created_at: Date;
    code_verified: boolean;
    code_verified_at: Date;
    created_at: Date;
    updated_at: Date;
}
export declare const LocalhostSchema: mongoose.Schema<Localhost, mongoose.Model<Localhost, any, any, any, mongoose.Document<unknown, any, Localhost> & Localhost & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Localhost, mongoose.Document<unknown, {}, mongoose.FlatRecord<Localhost>> & mongoose.FlatRecord<Localhost> & {
    _id: mongoose.Types.ObjectId;
}>;
