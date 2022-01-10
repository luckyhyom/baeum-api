import { IsJWT } from "class-validator"

export class JwtDTO {
    id: number
    
    @IsJWT()
    token: string

    name: string
}