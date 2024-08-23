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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const Customer_schema_1 = require("../schemas/Customer.schema");
const Bid_schema_1 = require("../schemas/Bid.schema");
const Localhost_schema_1 = require("../schemas/Localhost.schema");
const RoomRequests_schema_1 = require("../schemas/RoomRequests.schema");
const EmailService_1 = require("../utils/EmailService");
const City_schema_1 = require("../schemas/City.schema");
let CustomersService = class CustomersService {
    constructor(customerModel, bidModel, localhostModel, roomRequestModel, cityModel, emailService) {
        this.customerModel = customerModel;
        this.bidModel = bidModel;
        this.localhostModel = localhostModel;
        this.roomRequestModel = roomRequestModel;
        this.cityModel = cityModel;
        this.emailService = emailService;
    }
    async createBid(createBidDto) {
        const { city } = createBidDto;
        const findCity = await this.cityModel.findById(city).exec();
        if (!findCity) {
            return 'City does not exist';
        }
        const customer = await this.customerModel
            .findOne({ email: createBidDto.email })
            .exec();
        let _id;
        let CustomerName;
        if (!customer) {
            const { name, city, email } = createBidDto;
            const createdCustomer = new this.customerModel({
                name,
                city,
                email,
            });
            const savedCustomer = await createdCustomer.save();
            _id = savedCustomer._id;
            CustomerName = savedCustomer.name;
        }
        else {
            _id = customer._id;
            CustomerName = customer.name;
        }
        const { beds, people, nights, price_willing_to_pay, special_instructions } = createBidDto;
        const createdBid = new this.bidModel({
            customer: _id,
            beds,
            people,
            nights,
            price_willing_to_pay,
            special_instructions,
        });
        const savedBid = await createdBid.save();
        if (savedBid) {
            const localhosts = await this.localhostModel
                .find({
                city: createBidDto.city,
                code_verified: true,
            })
                .exec();
            const requestsPromises = localhosts.map((localhost) => this.roomRequestModel.create({
                bid: savedBid._id,
                localhost: localhost._id,
            }));
            await Promise.all(requestsPromises);
            const emailsPromises = localhosts.map((localhost) => this.emailService.sendEmail(localhost.email, 'A New Room Request - Last Minute Booking', `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Room Request</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>A New Room Request</h2>
                    <p>Hello,</p>
                    <p>A new room request has been received:</p>
                    <ul>
                        <li><strong>Name:</strong> ${CustomerName}</li>
                        <li><strong>City:</strong> ${findCity.city_name}</li>
                        <li><strong>Beds:</strong> ${beds}</li>
                        <li><strong>People:</strong> ${people}</li>
                        <li><strong>Nights:</strong> ${nights}</li>
                        <li><strong>Special Instructions:</strong> ${special_instructions}</li>
                    </ul>
                    <a href="https://m59media.com/negotiate?id=${savedBid._id}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none;">Negotiate Room Stay</a>
                    <p>If you have any questions or concerns, please contact us.</p>
                    <p>Thank you!</p>
                </div>
            </body>
            </html>
          `));
            await Promise.all(emailsPromises);
            try {
                await this.emailService.sendEmail(createBidDto.email, 'Confirmation - Last Minute Booking', `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmation</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Confirmation</h2>
                    <p>Thank you,</p>
                    <p>This email confirms that you will receive an email if a room is available.</p>
                </div>
            </body>
            </html>
          `);
                return savedBid;
            }
            catch (error) {
                console.log('Error sending confirmation email', error);
                return null;
            }
        }
        return null;
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Customer_schema_1.Customer.name)),
    __param(1, (0, mongoose_1.InjectModel)(Bid_schema_1.Bid.name)),
    __param(2, (0, mongoose_1.InjectModel)(Localhost_schema_1.Localhost.name)),
    __param(3, (0, mongoose_1.InjectModel)(RoomRequests_schema_1.RoomRequests.name)),
    __param(4, (0, mongoose_1.InjectModel)(City_schema_1.City.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        EmailService_1.EmailService])
], CustomersService);
//# sourceMappingURL=customers.service.js.map