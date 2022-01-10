import { User } from "../user.entity"

export class LoginResponse {
    id: number
    token: string
    name: string
    about: string
    email: string
    profileImageURL: string
    
    private constructor(user: User, token: string) {
        this.id = user.id;
        this.token = token;
        this.name = user.name;
        this.about = user.about;
        this.email = user.email;
        this.profileImageURL = user.profileImageURL;
    }

    static of(user: User, token: string) {
        const data = new LoginResponse(user, token);
        return {
            ...data
        }
    }
}