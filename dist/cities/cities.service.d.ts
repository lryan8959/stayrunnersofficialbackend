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
