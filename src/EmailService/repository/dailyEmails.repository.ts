import { DailyEmails } from "@models/DailyEmails/entities";
import { Injectable } from "@nestjs/common/decorators";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IDailyEmailsRepository } from "./dailyEmails.repository.interface";

@Injectable()
export class DailyEmailsRepository
  extends BaseRepository<DailyEmails>
  implements IDailyEmailsRepository{

    constructor(db: DatabaseService) {
    super(db, "dailyEmails");
    }

    async getOrCreateDailyEmails(date: Date, userId: string): Promise<DailyEmails> {
        const dailyEmails =  await this.findOne({
            where: {
                userId: userId,
                date: date
            }
        })
        if(!dailyEmails){
            return await this.create({
                userId: userId,
                date: date,
                amount: 0,
            })
        }
        return dailyEmails;
    }

    async addDailyEmailSent(id: string): Promise<DailyEmails> {
        return await this.update(id, {
            data: {
                amount: {increment: 1}
            }
        })
    }
}