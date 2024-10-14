export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000 // 15 min in ms
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000 // 30 day in ms

export const SMTP = {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    LOGIN: process.env.SMTP_USER,
    SMTP_KEY: process.env.SMTP_PASSWORD,
    FROM_EMAIL: process.env.SMTP_FROM,
}
