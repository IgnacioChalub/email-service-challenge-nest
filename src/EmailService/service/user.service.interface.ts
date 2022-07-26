import { CreateUserDto, LoginUserDto } from "@models/User/dto";
import { Token, User } from "@models/User/entities";

export abstract class IUserService {
    abstract createUser(createUserDto: CreateUserDto): Promise<User>;
    abstract loginUser(loginUserDto: LoginUserDto): Promise<Token>;
    abstract getUser(id: string): Promise<User>;
}
  