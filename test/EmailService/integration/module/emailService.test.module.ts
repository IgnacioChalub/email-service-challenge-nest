import { JwtStrategy } from '@EmailService/auth/jwt.strategy';
import { EmailController, UserController } from '@EmailService/controller';
import { IUserRepository, UserRepository, IDailyEmailsRepository, DailyEmailsRepository, IEmailProvider, NodemailerEmailProvider } from '@EmailService/repository';
import { IEmailService, EmailService, IUserService, UserService } from '@EmailService/service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SharedTestModule } from '../../../shared.test.module';

const userServiceProvider = {
    provide: IUserService,
    useClass: UserService,
};

const userRepositoryProvider = {
    provide: IUserRepository,
    useClass: UserRepository,
};

const emailServiceProvider = {
  provide: IEmailService,
  useClass: EmailService,
}

const dailyEmailsRepositoryProvider = {
    provide: IDailyEmailsRepository,
    useClass: DailyEmailsRepository
}
const emailProviderProvider = {
    provide: IEmailProvider,
    useClass: NodemailerEmailProvider
}

@Module({
  imports: [
        SharedTestModule,
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
        emailProviderProvider
    ],
})
export class EmailServiceTestModule {}