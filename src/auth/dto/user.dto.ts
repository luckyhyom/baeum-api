import { PickType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";

export class LoginDTO extends PickType(CreateUserDTO, ['userId', 'password'] as const){}