import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() createUserDTO: CreateUserDTO) {
        this.authService.signup(createUserDTO);
    }

    @Post('login')
    login(@Body() loginDTO: LoginDTO) {
        this.authService.login(loginDTO);
    }

    @Patch()
    updateUser(@Body() updateUserDTO: UpdateUserDTO) {
        this.authService.updateUser(updateUserDTO);
    }

    @Post()
    logout() {
        this.authService.logout();
    }

    @Delete()
    deleteUser(@Body() loginDTO: LoginDTO) {
        this.authService.deleteUser(loginDTO);
    }

}
