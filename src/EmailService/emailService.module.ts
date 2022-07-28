import { SharedModule } from "@shared/shared.module";
import { Module } from "@nestjs/common";
import { EmailController, UserController } from "./controller";
import { EmailService, IEmailService, IUserService, UserService } from "./service";
import { DailyEmailsRepository, IDailyEmailsRepository, IEmailProvider, IUserRepository, MailgunEmailProvider, NodemailerEmailProvider, UserRepository } from "./repository";
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

const emailServiceProvider = {
  provide: IEmailService,
  useClass: EmailService
}

const dailyEmailsRepositoryProvider = {
  provide: IDailyEmailsRepository,
  useClass: DailyEmailsRepository
}

const mailgunProvider = {
  provide: IEmailProvider,
  useClass: MailgunEmailProvider
}

const nodemailerProvider = {
  provide: IEmailProvider,
  useClass: NodemailerEmailProvider
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
  controllers: [UserController, EmailController],
  providers: [
    JwtStrategy,
    userServiceProvider,
    userRepositoryProvider,
    emailServiceProvider,
    dailyEmailsRepositoryProvider,
    nodemailerProvider
  ],
})
export class EmailServiceModule {}
