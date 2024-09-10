import { IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateBidDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    delivery_address: string;
    

    @IsNumber()
    @IsNotEmpty()
    price_willing_to_pay: number;

    @IsString()
    @IsNotEmpty()
    special_instructions: string;

    @IsString()
    @IsNotEmpty()
    payment_type: string;
}
