import { IsEmail, MinLength } from 'class-validator';

export class LoginInputDto {
    @IsEmail()
    email: string;

    @MinLength(10)
    password: string;
}