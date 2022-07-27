import { JwtAuthGuard } from "@EmailService/auth/jwt.authGuard";
import { IUserService } from "@EmailService/service";
import { CreateUserDto, LoginUserDto } from "@models/User/dto";
import { Token, User } from "@models/User/entities";
import { Body, Controller, Get, Inject, Post, UseGuards, Request } from "@nestjs/common";

@Controller("user")
export class UserController {

  constructor(
    @Inject(IUserService)
    private readonly userService: IUserService
  ) {}

  @Post()
  async createParticipant(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }
  
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<Token> {
    return await this.userService.loginUser(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@Request() req: any): Promise<User> {
    return await this.userService.getUser(req.user.userId)
  }

}