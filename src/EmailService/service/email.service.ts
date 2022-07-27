import { IDailyEmailsRepository, IEmailProvider, IUserRepository } from "@EmailService/repository";
import { SendEmailDto } from "@models/DailyEmails/dto";
import { DailyEmails } from "@models/DailyEmails/entities";
import { Inject, Injectable } from "@nestjs/common";
import { EmailCouldNotBeSentError } from "@shared/errors";
import { IEmailService } from "./email.service.interface";

@Injectable()
export class EmailService implements IEmailService {

    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IDailyEmailsRepository)
        private readonly dailyEmailsRepository: IDailyEmailsRepository,
        @Inject(IEmailProvider)
        private readonly emailProvider: IEmailProvider,
    ) {}
    
    async sendEmail(userId: string, sendEmailDto: SendEmailDto): Promise<DailyEmails> {
        const user = await this.userRepository.findWithoutPassword(userId);
        const dailyEmails = await this.dailyEmailsRepository.getOrCreateDailyEmails(sendEmailDto.date, user.id);

        if(dailyEmails.amount >= 1000) throw new EmailCouldNotBeSentError();

        const sent = await this.emailProvider.sendEmail(user.email, sendEmailDto.to, sendEmailDto.subject, sendEmailDto.text);
        if(!sent) throw new EmailCouldNotBeSentError();
        
        return await this.dailyEmailsRepository.addDailyEmailSent(dailyEmails.id);
    }

}