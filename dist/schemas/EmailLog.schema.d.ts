import { Customer } from "./Customer.schema";
import { Localhost } from "./Localhost.schema";
export declare class EmailLog {
    customer: Customer;
    localhost: Localhost;
    email: string;
    created_at: Date;
}
