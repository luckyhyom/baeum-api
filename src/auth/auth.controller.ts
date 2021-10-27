import { AuthGuard } from '@nestjs/passport';
import { Body, Controller, Delete, Get, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { JwtDTO } from './dto/jwt.dto';
import { LoginResponse } from './dto/login-response.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/login.dto';
import { ParamUser } from './user.decorator';
import { ProfileImage } from './dto/profileImage.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() createUserDTO: CreateUserDTO, @Res({passthrough: true}) res: Response) {
        return this.authService.signup(createUserDTO, res);
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO, @Res({passthrough: true}) res: Response): Promise<LoginResponse> {
        return this.authService.login(loginDTO, res);
    }

    @Patch()
    @UseGuards(AuthGuard('jwt'))
    updateUser(@ParamUser() user: JwtDTO, @Body() newData: UpdateUserDTO): Promise<LoginResponse> {
        return this.authService.updateUser(user, newData);
    }

    @Post('logout')
    logout(@Res({passthrough: true})res: Response) {
        res.clearCookie('token')
        return { message: 'logged out' };
    }

    @Delete()
    deleteUser(@Body() loginDTO: LoginDTO) {
        this.authService.deleteUser(loginDTO);
    }

    @Get('me')
    @UseGuards(AuthGuard('jwt'))
    async me(@ParamUser() user: JwtDTO): Promise<LoginResponse> {
        return this.authService.me(user);
    }

    @Get('csrf-token')
    async getCSRFToken() {
        const csrfToken = await this.authService.createCSRFToken()
        return { csrfToken };
    }

    @Post('image')
    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(
        AmazonS3FileInterceptor('image', {
            randomFilename: true,
            dynamicPath: 'profile'
        }),
    )
    uploadFile(@ParamUser() user:JwtDTO, @UploadedFile() file): Promise<ProfileImage> {
        console.log(file);
        return this.authService.uploadProfileImageURL(user.id, file.Location);
    }
}