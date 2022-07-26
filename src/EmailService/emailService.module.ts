import { SharedModule } from "@shared/shared.module";
import { Module } from "@nestjs/common";
import { UserController } from "./controller";
import { IUserService, UserService } from "./service";
import { IUserRepository, UserRepository } from "./repository";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./auth/jwt.strategy";

const userServiceProvider = {
  provide: IUserService,
  useClass: UserService
}

const userRepositoryProvider = {
  provide: IUserRepository,
  useClass: UserRepository
}

@Module({
  imports: [
    SharedModule,
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {expiresIn: '3600s'}
    })
  ],
  controllers: [UserController],
  providers: [
    JwtStrategy,
    userServiceProvider,
    userRepositoryProvider,
  ],
})
export class EmailServiceModule {}
