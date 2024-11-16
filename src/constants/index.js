import * as path from 'node:path';

export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}

export const ACCESS_TOKEN_TTL = 30 * 15 * 60 * 1000 // 30*15 min in ms
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000 // 30 day in ms

export const SMTP = {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    LOGIN: process.env.SMTP_USER,
    SMTP_KEY: process.env.SMTP_PASSWORD,
    FROM_EMAIL: process.env.SMTP_FROM,
}

export const TEMPLATES_DIR = path.resolve("src", "templates");

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    ENABLE_CLOUDINARY: process.env.ENABLE_CLOUDINARY,
};