export const SORT_ORDER = {
    ASC: 'asc',
    DESC: 'desc'
}

export const ACCESS_TOKEN_TTL = 15 * 60 * 1000 // 15 min in ms
export const REFRESH_TOKEN_TTL = 30 * 24 * 60 * 60 * 1000 // 30 day in ms

export const SMTP = {
    SERVER: process.env.SMTP_SERVER,
    PORT: process.env.SMTP_PORT,
    LOGIN: process.env.SMTP_LOGIN,
    SMTP_KEY: process.env.SMTP_KEY,
    FROM_EMAIL: process.env.SMTP_FROM_EMAIL,
}