import { ConfigModule } from '@nestjs/config'
ConfigModule.forRoot();

function required(key, defaultValue = undefined) {
    const result = process.env[key] || defaultValue;
    if (!result) {
        throw new Error(`key ${key} is undefined`);
    }
    return result;
}

export const config = {
    port: required('HOST_PORT',5432),
    db: {
        // host: 'localhost',
        // username: 'postgres',
        // database: 'baeum-api',
        // password: 'super1234',
        
        host: 'localhost',
        username: 'postgres',
        database: 'baeum-api',
        // password: 'super1234',

        // host: required('DB_HOST'),
        // username: required('DB_USER'),
        // database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'),
    },
}

export default config;
// export const config = {
//     port: required('HOST_PORT',5432),
//     db: {
//         host: 'localhost',
//         username: 'postgres',
//         database: 'baeum-api',
//         password: 'super1234',
//         // host: required('DB_HOST'),
//         // username: required('DB_USER'),
//         // database: required('DB_DATABASE'),
//         // password: required('DB_PASSWORD'),
//     },
// }