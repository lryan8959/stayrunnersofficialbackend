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
import { Model } from 'mongoose';
import { CreateCityDto } from './dtos/CreateCity.dto';
import { City } from 'src/schemas/City.schema';
import { Country } from 'src/schemas/Country.schema';
export declare class CitiesService {
    private cityModel;
    private countryModel;
    constructor(cityModel: Model<City>, countryModel: Model<Country>);
    createCity(createCityDto: CreateCityDto): Promise<(import("mongoose").Document<unknown, {}, City> & City & {
        _id: import("mongoose").Types.ObjectId;
    }) | "Country does not exist" | "City already exists">;
    getAllCities(): Promise<(import("mongoose").Document<unknown, {}, City> & City & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
