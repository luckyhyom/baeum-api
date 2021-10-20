import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, Length, Max, Min } from "class-validator";

export class CreateUserDTO {
    @Length(8,14)
    @IsString()
    @IsNotEmpty()
	userId: string;

    @Length(9,18)
    @IsString()
    @IsNotEmpty()
	password: string;

    @Length(2,6)
    @IsString()
    @IsNotEmpty()
	name: string;

    @Length(2,8)
    @IsString()
    @IsNotEmpty()
	about: string;

    @IsEmail()
    @IsNotEmpty()
	email: string;

    @IsUrl()
    @IsString()
    @IsOptional()
	photoURL: string = 'www.makevalue.net';
}