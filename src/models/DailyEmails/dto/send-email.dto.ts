import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { Type } from 'class-transformer';

export class SendEmailDto {

    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    date: Date;
} 