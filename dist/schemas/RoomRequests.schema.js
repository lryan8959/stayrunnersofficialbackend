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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomRequestsSchema = exports.RoomRequests = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Bid_schema_1 = require("./Bid.schema");
const Localhost_schema_1 = require("./Localhost.schema");
let RoomRequests = class RoomRequests {
};
exports.RoomRequests = RoomRequests;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Bid' }),
    __metadata("design:type", Bid_schema_1.Bid)
], RoomRequests.prototype, "bid", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId, ref: 'Localhost' }),
    __metadata("design:type", Localhost_schema_1.Localhost)
], RoomRequests.prototype, "localhost", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, default: false }),
    __metadata("design:type", Boolean)
], RoomRequests.prototype, "accepted", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], RoomRequests.prototype, "accepted_at", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Boolean)
], RoomRequests.prototype, "dealed", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], RoomRequests.prototype, "dealed_at", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], RoomRequests.prototype, "created_at", void 0);
exports.RoomRequests = RoomRequests = __decorate([
    (0, mongoose_1.Schema)()
], RoomRequests);
exports.RoomRequestsSchema = mongoose_1.SchemaFactory.createForClass(RoomRequests);
//# sourceMappingURL=RoomRequests.schema.js.map