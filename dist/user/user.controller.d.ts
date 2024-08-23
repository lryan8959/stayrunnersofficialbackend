import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): string;
    getUserDetails(req: Request, res: any): Promise<void>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
