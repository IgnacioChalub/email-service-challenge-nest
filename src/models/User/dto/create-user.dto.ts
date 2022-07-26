import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    username: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @MinLength(7)
    password: string;

    @IsNotEmpty()
    isAdmin: boolean;

}
