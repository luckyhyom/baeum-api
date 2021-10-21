import { PickType } from "@nestjs/mapped-types";
import { IsUrl, IsString, IsOptional } from "class-validator";
import { CreateUserDTO } from "./create-user.dto";
// PartialType(OmitType(CreateUserDTO,['userId'] as const))

export class UpdateUserDTO extends PickType(CreateUserDTO, ['about'] as const) {}
