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
exports.RedisController = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("./redis.service");
const create_redi_dto_1 = require("./dto/create-redi.dto");
let RedisController = class RedisController {
    constructor(redisService) {
        this.redisService = redisService;
    }
    create(createRediDto) {
        return this.redisService.create(createRediDto);
    }
    findOne(id) {
        return this.redisService.findOne(id);
    }
    remove(id) {
        return this.redisService.remove(id);
    }
    clearAll() {
        return this.redisService.clearAll();
    }
};
exports.RedisController = RedisController;
__decorate([
    (0, common_1.Post)('/set'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_redi_dto_1.CreateRediDto]),
    __metadata("design:returntype", void 0)
], RedisController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RedisController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)('/remove'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RedisController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('clear'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RedisController.prototype, "clearAll", null);
exports.RedisController = RedisController = __decorate([
    (0, common_1.Controller)('redis'),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], RedisController);
//# sourceMappingURL=redis.controller.js.map