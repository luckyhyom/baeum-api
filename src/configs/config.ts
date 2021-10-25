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
        host: required('DB_HOST','localhost'),
        username: required('DB_USER', 'inmemory'),
        database: required('DB_DATABASE', 'inmemory'),
        password: required('DB_PASSWORD', 'inmemory'),
    },
    csrf: {
        password: required('CSRF_PASSWORD','test')
    },
    aws: {
        s3: {
            name: required('AWS_S3_BUCKET_NAME', 'inmemory'),
            region: required('AWS_S3_REGION', 'inmemory'),
            access_key: required('AWS_S3_ACCESS_KEY', 'inmemory'),
            secret_key: required('AWS_S3_SECRET_KEY', 'inmemory'),
        }
    }
}

export default config;