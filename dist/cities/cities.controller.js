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
exports.CitiesController = void 0;
const common_1 = require("@nestjs/common");
const cities_service_1 = require("./cities.service");
const CreateCity_dto_1 = require("./dtos/CreateCity.dto");
let CitiesController = class CitiesController {
    constructor(citiesService) {
        this.citiesService = citiesService;
    }
    async createCity(createCityDto, res) {
        const city = await this.citiesService.createCity(createCityDto);
        if (city === 'Country does not exist') {
            throw new common_1.HttpException('Country does not exist', 400);
        }
        else if (city === 'City already exists') {
            throw new common_1.HttpException('City already exists', 400);
        }
        else if (city) {
            return res.status(201).json({
                data: city,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
    async getAllCities(res) {
        const cities = await this.citiesService.getAllCities();
        if (cities) {
            return res.status(200).json({
                data: cities,
            });
        }
        else {
            throw new common_1.HttpException('Internal server error', 500);
        }
    }
};
exports.CitiesController = CitiesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateCity_dto_1.CreateCityDto, Object]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "createCity", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CitiesController.prototype, "getAllCities", null);
exports.CitiesController = CitiesController = __decorate([
    (0, common_1.Controller)('cities'),
    __metadata("design:paramtypes", [cities_service_1.CitiesService])
], CitiesController);
//# sourceMappingURL=cities.controller.js.map