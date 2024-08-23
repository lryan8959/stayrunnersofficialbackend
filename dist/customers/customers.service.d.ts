import { Model } from 'mongoose';
import { Customer } from 'src/schemas/Customer.schema';
import { CreateBidDto } from './dtos/CreateBid.dto';
import { Bid } from 'src/schemas/Bid.schema';
import { Localhost } from 'src/schemas/Localhost.schema';
import { RoomRequests } from 'src/schemas/RoomRequests.schema';
import { EmailService } from 'src/utils/EmailService';
import { City } from 'src/schemas/City.schema';
export declare class CustomersService {
    private customerModel;
    private bidModel;
    private localhostModel;
    private roomRequestModel;
    private cityModel;
    private emailService;
    constructor(customerModel: Model<Customer>, bidModel: Model<Bid>, localhostModel: Model<Localhost>, roomRequestModel: Model<RoomRequests>, cityModel: Model<City>, emailService: EmailService);
    createBid(createBidDto: CreateBidDto): Promise<(import("mongoose").Document<unknown, {}, Bid> & Bid & {
        _id: import("mongoose").Types.ObjectId;
    }) | "City does not exist">;
}
