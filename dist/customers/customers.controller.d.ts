import { CustomersService } from './customers.service';
import { CreateBidDto } from './dtos/CreateBid.dto';
import { Response } from 'express';
export declare class CustomersController {
    private customersService;
    constructor(customersService: CustomersService);
    createBid(createBidDto: CreateBidDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
