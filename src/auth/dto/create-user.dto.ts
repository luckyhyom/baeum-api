import { IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateUserDTO {
    @Length(8,26)
    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
	userId: string;

    @Length(10,30)
    @IsString()
    @IsNotEmpty()
    @IsAlphanumeric()
	password: string;

    @Length(2, 100)
    @IsString()
    @IsNotEmpty()
	name: string;

    @Length(8,50)
    @IsString()
    @IsNotEmpty()
	about: string;

    @Length(5, 200)
    @IsEmail()
    @IsNotEmpty()
	email: string;
}