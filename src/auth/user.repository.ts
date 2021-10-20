import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { LoginDTO } from "./dto/user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDTO: CreateUserDTO) {        
        return await this.save(createUserDTO)
    }

    findById(id: number) {
        return this.findOne({ id })
    }

    findByUserId(userId: string): Promise<User> {
        return this.findOne({ userId });
    }

    updateUser(id: number, updateUserDTO: UpdateUserDTO) {
        this.update(id,updateUserDTO);
    }

    deleteUser(loginDTO: LoginDTO) {

    }

    async getPassword(userId: string): Promise<string> {
        return (await this.createQueryBuilder('user').select(['user.password']).where("user.userId = :userId", { userId }).getOne()).password;
    }

}