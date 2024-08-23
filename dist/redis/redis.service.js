"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisService = void 0;
const common_1 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
let RedisService = class RedisService {
    constructor(cacheManager) {
        this.cacheManager = cacheManager;
        this.create = async (createRediDto) => {
            if (createRediDto.ttl && createRediDto.ttl > 1000) {
                await this.cacheManager.set(createRediDto.key, createRediDto.value, createRediDto.ttl);
            }
            else {
                await this.cacheManager.set(createRediDto.key, createRediDto.value);
            }
            return {
                message: `${createRediDto.key} is settled in cache`,
            };
        };
        this.clearAll = async () => {
            await this.cacheManager.reset();
            return { message: 'clear' };
        };
        this.findOne = async (id) => {
            const fromCache = await this.cacheManager.get(id);
            return fromCache;
        };
        this.remove = async (id) => {
            await this.cacheManager.del(id);
            return { message: `removed ${id}` };
        };
    }
};
exports.RedisService = RedisService;
exports.RedisService = RedisService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object])
], RedisService);
//# sourceMappingURL=redis.service.js.map