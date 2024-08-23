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
exports.AuthService = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Localhost_schema_1 = require("../schemas/Localhost.schema");
const mongoose_2 = require("mongoose");
const bcrypt_1 = require("../utils/bcrypt");
const fakeUsers = [
    {
        id: 1,
        email: 'anson',
        password: 'password',
    },
    {
        id: 2,
        email: 'jack',
        password: 'password123',
    },
];
let AuthService = class AuthService {
    constructor(jwtService, localhostModel) {
        this.jwtService = jwtService;
        this.localhostModel = localhostModel;
    }
    async validateUser(authPayloadDto) {
        const user = await this.localhostModel.findOne({
            email: authPayloadDto.email,
        });
        if (user) {
            if (user?.code_verified) {
                const matchPasswords = (0, bcrypt_1.comparePasswords)(authPayloadDto.password, user.password);
                if (matchPasswords) {
                    const payload = {
                        email: user.email,
                        id: user._id,
                        verified: user.code_verified,
                        userRole: 'localhost',
                    };
                    const accessToken = this.jwtService.sign(payload);
                    return { token: accessToken };
                }
                else {
                    return null;
                }
            }
            else if (!user?.code_verified) {
                return 'Email is not verified!';
            }
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(Localhost_schema_1.Localhost.name)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map