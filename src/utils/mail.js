import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

const transport = nodemailer.createTransport({
    host: SMTP.SERVER,
    port: SMTP.PORT,
    secure: false,
    auth: {
        user: SMTP.LOGIN,
        pass: SMTP.SMTP_KEY
    }
});

export const sendMail = (message) => {
    return transport.sendMail(message);
}
