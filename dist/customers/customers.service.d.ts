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
