import { CreateUserDto } from "@models/User/dto";
import { User } from "@models/User/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IUserRepository extends IBaseRepository<User> {
    abstract findByUsername(username: string): Promise<User>;
    abstract findWithutPassword(id: string): Promise<User>;
}