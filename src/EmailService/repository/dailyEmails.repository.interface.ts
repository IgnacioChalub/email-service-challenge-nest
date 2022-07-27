import { DailyEmails } from "@models/DailyEmails/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IDailyEmailsRepository extends IBaseRepository<DailyEmails> {
    abstract getOrCreateDailyEmails(date: Date, userId: string): Promise<DailyEmails>;
    abstract addDailyEmailSent(id: string): Promise<DailyEmails>;
}