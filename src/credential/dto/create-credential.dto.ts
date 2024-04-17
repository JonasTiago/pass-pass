import { IsString } from "class-validator";

export class CreateCredentialDto {
    @IsString()
    url: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    title: string;
}
