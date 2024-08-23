import { City } from "src/schemas/City.schema";
export declare class UpdateRoomDto {
    room_id: string;
    localhost: string;
    pic_urls: string[];
    description: string;
    payment_option: string;
    min_price_per_night: number;
    city: City;
    billing: string;
}
