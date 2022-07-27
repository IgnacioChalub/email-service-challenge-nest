import { GetStatsDto, SendEmailDto } from "@models/DailyEmails/dto";
import { DailyEmails } from "@models/DailyEmails/entities";

export abstract class IEmailService {
    abstract sendEmail(userId: string, sendEmailDto: SendEmailDto): Promise<DailyEmails>;
    abstract getStats(getStatsDto: GetStatsDto): Promise<DailyEmails[]>;

}