import mongoose from "mongoose";
import { Country } from "./Country.schema";
export declare class City {
    city_name: string;
    country: Country;
}
export declare const CitySchema: mongoose.Schema<City, mongoose.Model<City, any, any, any, mongoose.Document<unknown, any, City> & City & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, City, mongoose.Document<unknown, {}, mongoose.FlatRecord<City>> & mongoose.FlatRecord<City> & {
    _id: mongoose.Types.ObjectId;
}>;
