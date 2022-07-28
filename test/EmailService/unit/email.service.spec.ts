import { IUserRepository, IDailyEmailsRepository, IEmailProvider, UserRepository, DailyEmailsRepository, NodemailerEmailProvider } from '@EmailService/repository';
import { EmailService, IEmailService } from '@EmailService/service';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedModule } from '@shared/shared.module';

describe('EmailService Unit Test', () => {
    let emailService: IEmailService;
    let userRepository: IUserRepository;
    let dailyEmailsRepository: IDailyEmailsRepository;
    let emailProvider: IEmailProvider;
  
    beforeEach(async () => {
      const emailServiceProvider = {
        provide: IEmailService,
        useClass: EmailService,
      };
  
      const userRepositoryProvider = {
        provide: IUserRepository,
        useClass: UserRepository,
      };
  
      const dailyEmailsRepositoryProvider = {
          provide: IDailyEmailsRepository,
          useClass: DailyEmailsRepository
      }
  
      const emailProviderProvider = {
          provide: IEmailProvider,
          useClass: NodemailerEmailProvider
      }
  
      const app: TestingModule = await Test.createTestingModule({
        imports: [SharedModule],
        providers: [emailServiceProvider, userRepositoryProvider, dailyEmailsRepositoryProvider, emailProviderProvider],
      }).compile();
  
        emailService = app.get<IEmailService>(IEmailService);
        userRepository = app.get<IUserRepository>(IUserRepository);
        dailyEmailsRepository  =  app.get<IDailyEmailsRepository>(IDailyEmailsRepository);
        emailProvider =  app.get<IEmailProvider>(IEmailProvider);
    });

    it('should throw error if it already send 1000 emails that same day', async () => {
        const user = {
            id: "1",
            username: "mateo",
            email: "mateo@mateo.com",
            isAdmin: false,
        }

        const dailyEmails = {
            id: "some id",
            date: new Date("2022-07-27T03:00:00.000Z"),
            amount: 1000
        }

        const sendEmailDto = {
            to: "someon@someone.com",
            subject: "subject",
            text: "text",
            date: new Date("2022-07-27T03:00:00.000Z")
        }

        jest.spyOn(userRepository, 'findWithoutPassword').mockImplementation(() => Promise.resolve(user));
        jest.spyOn(dailyEmailsRepository, 'getOrCreateDailyEmails').mockImplementation(() => Promise.resolve(dailyEmails));
        
        try {
            await emailService.sendEmail(user.id, sendEmailDto);
        } catch (error) {
            expect(error.message).toBe(`Email could not be sent`);
        }

    });


    it('should throw error email provider throws error', async () => {
        const user = {
            id: "1",
            username: "mateo",
            email: "mateo@mateo.com",
            isAdmin: false,
        }

        const dailyEmails = {
            id: "some id",
            date: new Date("2022-07-27T03:00:00.000Z"),
            amount: 467
        }

        const sendEmailDto = {
            to: "someon@someone.com",
            subject: "subject",
            text: "text",
            date: new Date("2022-07-27T03:00:00.000Z")
        }

        jest.spyOn(userRepository, 'findWithoutPassword').mockImplementation(() => Promise.resolve(user));
        jest.spyOn(dailyEmailsRepository, 'getOrCreateDailyEmails').mockImplementation(() => Promise.resolve(dailyEmails));
        jest.spyOn(emailProvider, 'sendEmail').mockImplementation(() => Promise.resolve(false));

        try {
            await emailService.sendEmail(user.id, sendEmailDto);
        } catch (error) {
            expect(error.message).toBe(`Email could not be sent`);
        }

    });

});