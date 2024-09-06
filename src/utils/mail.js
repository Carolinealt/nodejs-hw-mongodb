import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

const transport = nodemailer.createTransport({
    host: SMTP.SMTP_SERVER,
    port: SMTP.SMTP_PORT,
    secure: false,
    auth: {
        user: SMTP.SMTP_LOGIN,
        pass: SMTP.SMTP_KEY
    }
});

export const sendMail = (message) => {
    return transport.sendMail(message);
}
