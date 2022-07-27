import { User } from "@models/User/entities";
import { IBaseRepository } from "@shared/repository";

export abstract class IUserRepository extends IBaseRepository<User> {
    abstract findByUsername(username: string): Promise<User>;
    abstract findWithoutPassword(id: string): Promise<User>;
}