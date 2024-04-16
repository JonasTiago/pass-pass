import { IsString, IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;

    @IsString()
    lastName: string;

    @IsString()
    firstName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1
    })
    password: string;

    @IsString()
    phone: string;

    @IsString()
    role: string;

}