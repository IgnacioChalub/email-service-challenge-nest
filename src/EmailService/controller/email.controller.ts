import { JwtAuthGuard } from "@EmailService/auth/jwt.authGuard";
import { RolesGuard } from "@EmailService/auth/roles.guard";
import { IEmailService } from "@EmailService/service";
import { GetStatsDto, SendEmailDto } from "@models/DailyEmails/dto";
import { DailyEmails } from "@models/DailyEmails/entities";
import { Body, Controller, Get, Inject, Post, Request, UseGuards } from "@nestjs/common";

@Controller("email")
export class EmailController {

    constructor(
        @Inject(IEmailService)
        private readonly emailService: IEmailService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    async sendEmail(@Request() req: any,@Body() sendEmailDto: SendEmailDto): Promise<DailyEmails> {
        return await this.emailService.sendEmail(req.user.userId, sendEmailDto);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/stats')
    async getStats(@Body() getStatsDto: GetStatsDto): Promise<DailyEmails[]> {
        return await this.emailService.getStats(getStatsDto)
    }


}