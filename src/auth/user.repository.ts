import { EntityRepository, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { LoginDTO } from "./dto/login.dto";
import { User } from "./user.entity";
import { ProfileImage } from "./dto/profileImage.dto";

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

    updateUser(id: number, newData: UpdateUserDTO | ProfileImage) {
        return this.update(id, { ...newData });
    }

    deleteUser(loginDTO: LoginDTO) {

    }

    async getPassword(userId: string): Promise<string> {
        return (await this.createQueryBuilder('user').select(['user.password']).where("user.userId = :userId", { userId }).getOne()).password;
    }

}