"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const customers_controller_1 = require("./customers.controller");
const customers_service_1 = require("./customers.service");
const mongoose_1 = require("@nestjs/mongoose");
const Customer_schema_1 = require("../schemas/Customer.schema");
const Bid_schema_1 = require("../schemas/Bid.schema");
const Localhost_schema_1 = require("../schemas/Localhost.schema");
const RoomRequests_schema_1 = require("../schemas/RoomRequests.schema");
const EmailService_1 = require("../utils/EmailService");
const City_schema_1 = require("../schemas/City.schema");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Customer_schema_1.Customer.name, schema: Customer_schema_1.CustomerSchema },
                { name: Bid_schema_1.Bid.name, schema: Bid_schema_1.BidSchema },
                { name: Localhost_schema_1.Localhost.name, schema: Localhost_schema_1.LocalhostSchema },
                { name: RoomRequests_schema_1.RoomRequests.name, schema: RoomRequests_schema_1.RoomRequestsSchema },
                { name: City_schema_1.City.name, schema: City_schema_1.CitySchema },
            ])
        ],
        controllers: [customers_controller_1.CustomersController],
        providers: [customers_service_1.CustomersService, EmailService_1.EmailService]
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map