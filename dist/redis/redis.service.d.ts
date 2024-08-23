import { CreateRediDto } from './dto/create-redi.dto';
import { Cache } from 'cache-manager';
export declare class RedisService {
    private readonly cacheManager;
    constructor(cacheManager: Cache);
    create: (createRediDto: CreateRediDto) => Promise<{
        message: string;
    }>;
    clearAll: () => Promise<{
        message: string;
    }>;
    findOne: (id: string) => Promise<unknown>;
    remove: (id: string) => Promise<{
        message: string;
    }>;
}
