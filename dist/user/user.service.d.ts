import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Bid } from 'src/schemas/Bid.schema';
import { Model } from 'mongoose';
import { Customer } from 'src/schemas/Customer.schema';
export declare class UserService {
    private bidModel;
    private customerModel;
    constructor(bidModel: Model<Bid>, customerModel: Model<Customer>);
    create(createUserDto: CreateUserDto): string;
    findAll(): string;
    findOne(bitId: any, userRole: any): Promise<{
        customerData: import("mongoose").Document<unknown, {}, Customer> & Customer & {
            _id: import("mongoose").Types.ObjectId;
        };
        userRole: any;
        bitId: any;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
