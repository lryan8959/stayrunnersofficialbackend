import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dtos/CreateCountry.dto';
export declare class CountriesController {
    private countriesService;
    constructor(countriesService: CountriesService);
    createCountry(createCountryDto: CreateCountryDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/Country.schema").Country> & import("../schemas/Country.schema").Country & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
