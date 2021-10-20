import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Response } from 'express';
import config from 'src/configs/config';
import { LoginResponse } from './dto/login-response.dto';
import { JwtDTO } from './dto/jwt.dto';

const salt = 10;
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(createUserDTO: CreateUserDTO, res: Response) {
        if (await this.userRepository.findByUserId(createUserDTO.userId)) {
            throw new Error("already exists");
        }

        const { id, name } = await this.userRepository.createUser({
            ...createUserDTO,
            password: await this.hashValue(createUserDTO.password)
        });

        let token;
        token = this.jwtService.sign({ id })
        this.setToken(token, res);
        return { token, name };
    }

    async login(data: LoginDTO, res: Response): Promise<LoginResponse> {
        const { id, name } = await this.userRepository.findByUserId(data.userId);

        if (!id) {
            throw new Error("no user");
        }

        let token;
        if (await this.comparePassword(data)) {
            token = this.jwtService.sign({ id })
            this.setToken(token, res);
            return { token, name };
        } else {
            throw new Error('wrong password!')
        }
    }
    
    async comparePassword(data) {
        return bcrypt.compare(data.password, await this.getOriginalPassword(data.userId))
    }

    async getOriginalPassword(userId) {
        return await this.userRepository.getPassword(userId);
    }

    updateUser(updateUserDTO: UpdateUserDTO) {
        // jwt 검증
        // 정보 변경
    }
    
    deleteUser(deleteUserDTO: LoginDTO) {
        // 패스워드 검증
        // jwt 검증
        // 계정 삭제
        // this.delete()
    }

    async me(user: JwtDTO): Promise<LoginResponse> {
        return {
            name: (await this.userRepository.findById(user.id)).name,
            token: user.token
        }
    }

    async hashValue(password: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }

    setToken(token: string, res: Response) {
        // brower should have credentials: 'include' option.
        const options: CookieOptions = {
            maxAge: 60 * 60 * 2 * 1000,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        };
        res.cookie('token', token, options)
    }

    async createCSRFToken() {
        return bcrypt.hash(config.csrf.password,1);
    }
}