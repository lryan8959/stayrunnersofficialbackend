"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalhostsModule = void 0;
const common_1 = require("@nestjs/common");
const localhosts_service_1 = require("./localhosts.service");
const localhosts_controller_1 = require("./localhosts.controller");
const mongoose_1 = require("@nestjs/mongoose");
const Localhost_schema_1 = require("../schemas/Localhost.schema");
const RoomRequests_schema_1 = require("../schemas/RoomRequests.schema");
const Room_schema_1 = require("../schemas/Room.schema");
const EmailService_1 = require("../utils/EmailService");
const Customer_schema_1 = require("../schemas/Customer.schema");
const Bid_schema_1 = require("../schemas/Bid.schema");
const jwt_1 = require("@nestjs/jwt");
let LocalhostsModule = class LocalhostsModule {
};
exports.LocalhostsModule = LocalhostsModule;
exports.LocalhostsModule = LocalhostsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: Localhost_schema_1.Localhost.name, schema: Localhost_schema_1.LocalhostSchema },
                { name: RoomRequests_schema_1.RoomRequests.name, schema: RoomRequests_schema_1.RoomRequestsSchema },
                { name: Room_schema_1.Room.name, schema: Room_schema_1.RoomSchema },
                { name: Customer_schema_1.Customer.name, schema: Customer_schema_1.CustomerSchema },
                { name: Bid_schema_1.Bid.name, schema: Bid_schema_1.BidSchema },
            ]),
            jwt_1.JwtModule.register({
                secret: 'secretKey',
                signOptions: { expiresIn: '1d' },
            }),
        ],
        providers: [localhosts_service_1.LocalhostsService, EmailService_1.EmailService],
        controllers: [localhosts_controller_1.LocalhostsController],
    })
], LocalhostsModule);
//# sourceMappingURL=localhosts.module.js.map