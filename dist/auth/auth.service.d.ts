import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dtos/AuthPayload.dto';
import { Localhost } from 'src/schemas/Localhost.schema';
import { Model } from 'mongoose';
export declare class AuthService {
    private jwtService;
    private localhostModel;
    constructor(jwtService: JwtService, localhostModel: Model<Localhost>);
    validateUser(authPayloadDto: AuthPayloadDto): Promise<"Email is not verified!" | {
        token: string;
    }>;
}
