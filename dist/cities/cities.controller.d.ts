import { CitiesService } from './cities.service';
import { CreateCityDto } from './dtos/CreateCity.dto';
import { Response } from 'express';
export declare class CitiesController {
    private citiesService;
    constructor(citiesService: CitiesService);
    createCity(createCityDto: CreateCityDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllCities(res: Response): Promise<Response<any, Record<string, any>>>;
}
