import { ChatResponseService } from './chatResponse.service';
export declare class WebhookController {
    private readonly chatResponseService;
    constructor(chatResponseService: ChatResponseService);
    handleWebhook(requestBody: any): any;
}
