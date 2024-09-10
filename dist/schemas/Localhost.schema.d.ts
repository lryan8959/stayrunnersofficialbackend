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
