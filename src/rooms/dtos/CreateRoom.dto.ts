import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateRoomDto {
    localhost: string;

    @IsNotEmpty()
    pic: string[];


    pic_urls: string[]; // Assuming 'Pic' refers to an array of picture URLs

    
    @IsNotEmpty()
    @IsString()
    product_description: string;

    @IsNotEmpty()
    @IsString()
    payment_option: string;

    @IsNotEmpty()
    @IsNumber()
    min_price: number;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    product_size: string;

    @IsNotEmpty()
    @IsString()
    billing: string;
}
