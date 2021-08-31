import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { LoginDTO } from './dto/user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs'

const salt = 10;

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async signup(createUserDTO: CreateUserDTO) {
        
        if (this.userRepository.findByUserId(createUserDTO.userId)) {
            throw new Error("already exists");
        }

        try {
            this.userRepository.createUser({
                ...createUserDTO,
                password: await this.hashValue(createUserDTO.password)
            }); 
        } catch (error) {
            console.log(error);
        }
        return 'good'
    }

    async login(loginDTO: LoginDTO) {
        // 아이디 유무 확인
        const user = await this.userRepository.findByUserId(loginDTO.userId)
        
        if (!user) {
            throw new Error("no user");
        }

        // 패스워드 검증        
        console.log(await bcrypt.compare(loginDTO.password, user.password));
        // bcrypt.compare(password,)
        // jwt 송신
    }

    updateUser(updateUserDTO: UpdateUserDTO) {
        // jwt 검증
        // 정보 변경
    }

    logout() {

    }

    deleteUser(deleteUserDTO: LoginDTO) {
        // 패스워드 검증
        // jwt 검증
        // 계정 삭제
        // this.delete()
    }

    async me() {
        // 요청에 포함된 jwt를 검사하는 역할
        // 2개가 있던걸로 기억하는데.
    }

    async hashValue(password: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }
}