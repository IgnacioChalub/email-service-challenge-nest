import { User } from "@models/User/entities";
import { Injectable } from "@nestjs/common";
import { BaseRepository } from "@shared/repository";
import { DatabaseService } from "@shared/service";
import { IUserRepository } from "./user.repository.interface";

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository{


    constructor(db: DatabaseService) {
    super(db, "user");
    }

    async findByUsername(username: string): Promise<User> {
        return await this.findOne({
            where: {
                username: username
            }
        })
    }

    async findWithoutPassword(id: string): Promise<User> {
        return await this.findOne({
            where: {
                id: id
            },
            select: {
                id: true,
                username: true,
                email: true,
                isAdmin: true
            }
        })
    }

}
