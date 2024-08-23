import { Model } from 'mongoose';
import { CreateCountryDto } from './dtos/CreateCountry.dto';
import { Country } from 'src/schemas/Country.schema';
export declare class CountriesService {
    private countryModel;
    constructor(countryModel: Model<Country>);
    createCountry(createCountryDto: CreateCountryDto): Promise<import("mongoose").Document<unknown, {}, Country> & Country & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
