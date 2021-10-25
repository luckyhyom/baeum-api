import { PickType } from "@nestjs/mapped-types";
import { CreateUserDTO } from "./create-user.dto";
// PartialType(OmitType(CreateUserDTO,['userId'] as const))

export class UpdateUserDTO extends PickType(CreateUserDTO, ['about'] as const) {}
