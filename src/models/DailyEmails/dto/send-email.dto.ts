import { IsDate, IsEmail, IsNotEmpty } from "class-validator";
import { Transform, Type } from 'class-transformer';
import { toDateWithoutHours } from "./date.parser";

export class SendEmailDto {

    @IsEmail()
    @IsNotEmpty()
    to: string;

    @IsNotEmpty()
    subject: string;

    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    @Transform(toDateWithoutHours,  {toClassOnly: true})
    @IsDate()
    date: Date;

} 

