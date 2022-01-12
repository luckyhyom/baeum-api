import * as faker from 'faker';

type CreatedUser = {
    id: string,
    userId: string,
    password: string,
    name: string,
    about: string,
    email: string,
    token: string,
    profileImageURL: string
}

export async function createUser(req ,csrf): Promise<CreatedUser> {
    const data = createUserInfo();
    const res = await req.post('/auth/signup')
            .set(csrf)
            .send(data);
    return {
        ...data,
        id: res.body.id,
        token: res.body.token,
        profileImageURL: res.body.profileImageURL
    }
}

export function createUserInfo() {
    return {
        userId: faker.random.alphaNumeric(20),
        password: faker.internet.password(12, true),
        name: faker.internet.userName(),
        about: faker.random.words(5),
        email: faker.internet.email(),
    };
}