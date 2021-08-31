import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { LoginDTO } from "./dto/user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDTO: CreateUserDTO) {        
        await this.save(createUserDTO)
    }

    async findByUserId(userId: string): Promise<User> {
        return await this.findOne({userId});
    }

    async updateUser(id: number, updateUserDTO: UpdateUserDTO) {
        this.update(id,updateUserDTO);
    }

    async deleteUser(loginDTO: LoginDTO) {

    }

}