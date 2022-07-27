import { JwtAuthGuard } from "@EmailService/auth/jwt.authGuard";
import { IEmailService } from "@EmailService/service";
import { SendEmailDto } from "@models/DailyEmails/dto";
import { DailyEmails } from "@models/DailyEmails/entities";
import { Body, Controller, Inject, Post, Request, UseGuards } from "@nestjs/common";

@Controller("email")
export class EmailController {

    constructor(
        @Inject(IEmailService)
        private readonly emailService: IEmailService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async sendEmail(@Request() req: any, @Body() sendEmailDto: SendEmailDto): Promise<DailyEmails> {
        return await this.emailService.sendEmail(req.user.userId, sendEmailDto);
    }
}