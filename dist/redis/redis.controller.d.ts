import { RedisService } from './redis.service';
import { CreateRediDto } from './dto/create-redi.dto';
export declare class RedisController {
    private readonly redisService;
    constructor(redisService: RedisService);
    create(createRediDto: CreateRediDto): Promise<{
        message: string;
    }>;
    findOne(id: string): Promise<unknown>;
    remove(id: string): Promise<{
        message: string;
    }>;
    clearAll(): Promise<{
        message: string;
    }>;
}
