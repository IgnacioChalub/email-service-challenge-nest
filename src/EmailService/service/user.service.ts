import { IUserRepository } from "@EmailService/repository";
import { CreateUserDto, LoginUserDto } from "@models/User/dto";
import { Token, User } from "@models/User/entities";
import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NotFoundError } from "@shared/errors";
import { IUserService } from "./user.service.interface";

@Injectable()
export class UserService implements IUserService {
    
    constructor(
      @Inject(IUserRepository)
      private readonly userRepository: IUserRepository,
      @Inject(JwtService)
      private readonly jwtService: JwtService
    ) {}    
    
    async createUser(
      createUserDto: CreateUserDto
    ): Promise<User> {
      return await this.userRepository.create(createUserDto);
    }

    async loginUser(loginUserDto: LoginUserDto): Promise<Token> {
        const user = await this.userRepository.findByUsername(loginUserDto.username);
        if(!user || user.password != loginUserDto.password) throw new NotFoundError("user");
        const token = this.jwtService.sign({username: user.username, sub: user.id, isAdmin: user.isAdmin})
        return {
            "token": token
        }
    }

    async getUser(id: string): Promise<User> {
        return await this.userRepository.findWithoutPassword(id);
    }
}
