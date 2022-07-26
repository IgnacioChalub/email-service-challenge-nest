import { EmailServiceModule } from "@EmailService/emailService.module";
import { Module } from "@nestjs/common";


@Module({
  imports: [EmailServiceModule],
})
export class AppModule {}
