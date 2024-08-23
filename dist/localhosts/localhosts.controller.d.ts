import { LocalhostsService } from './localhosts.service';
import { CreateLocalhostDto } from './dtos/CreateLocalhost.dto';
import { Request, Response } from 'express';
import { VerifyLocalhostDto } from './dtos/VerifyLocalhost.dto';
import { EmailService } from 'src/utils/EmailService';
import { ForgotPasswordLocalhostDto } from './dtos/ForgotPasswordLocalhost.dto';
export declare class LocalhostsController {
    private localhostsService;
    private emailService;
    constructor(localhostsService: LocalhostsService, emailService: EmailService);
    createLocalhost(createLocalhostDto: CreateLocalhostDto, res: Response): Promise<Response<any, Record<string, any>>>;
    verifyLocalhost(id: string, verifyLocalhostDto: VerifyLocalhostDto, res: Response): Promise<Response<any, Record<string, any>>>;
    resendVerificationCode(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    forgotPasswordLocalhost(forgotPasswordLocalhostDto: ForgotPasswordLocalhostDto, res: Response): Promise<Response<any, Record<string, any>>>;
    sendEmail(): Promise<string>;
    acceptRequest(req: Request, id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    changeRoomAvailablity(req: Request, room_id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    getRoom(req: Request, room_id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteRoom(req: Request, room_id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    chatbot(body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    myProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    updateProfile(req: Request, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    changePassword(req: Request, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
    newPassword(req: Request, body: any, res: Response): Promise<Response<any, Record<string, any>>>;
}
