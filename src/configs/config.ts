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
        host: required('DB_HOST'),
        username: required('DB_USER'),
        database: required('DB_DATABASE'),
        password: required('DB_PASSWORD'),
    },
    csrf: {
        password: required('CSRF_PASSWORD')
    },
    aws: {
        s3: {
            name: required('AWS_S3_BUCKET_NAME'),
            region: required('AWS_S3_REGION'),
            access_key: required('AWS_S3_ACCESS_KEY'),
            secret_key: required('AWS_S3_SECRET_KEY'),
        }
    }
}

export default config;