"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const config_1 = require("@nestjs/config");
const mongoose_om_module_1 = require("./mongoose.om/mongoose.om.module");
const countries_module_1 = require("./countries/countries.module");
const cities_module_1 = require("./cities/cities.module");
const localhosts_module_1 = require("./localhosts/localhosts.module");
const auth_module_1 = require("./auth/auth.module");
const customers_module_1 = require("./customers/customers.module");
const bids_module_1 = require("./bids/bids.module");
const rooms_module_1 = require("./rooms/rooms.module");
const platform_express_1 = require("@nestjs/platform-express");
const mailer_1 = require("@nestjs-modules/mailer");
const chat_gateway_1 = require("./chat/chat.gateway");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const chatResonse_module_1 = require("./chatResponse/chatResonse.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            chatResonse_module_1.chatResponseModule,
            user_module_1.UserModule,
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env', '.env.development'],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads',
            }),
            mongoose_om_module_1.MongooseOmModule,
            countries_module_1.CountriesModule,
            cities_module_1.CitiesModule,
            localhosts_module_1.LocalhostsModule,
            auth_module_1.AuthModule,
            customers_module_1.CustomersModule,
            bids_module_1.BidsModule,
            rooms_module_1.RoomsModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.SMTP_HOST,
                    port: parseInt(process.env.SMTP_PORT, 10),
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                },
                defaults: {
                    from: process.env.SMTP_EMAIL,
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, chat_gateway_1.ChatGateway],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map