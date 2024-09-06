import crypto from "node:crypto";
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt'
import { Session } from '../models/session.js';
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL, SMTP } from "../constants/index.js";
import { sendMail } from "../utils/mail.js";
export const registerUser = async (payload) => {
    const maybeUser = await User.findOne({ email: payload.email });

    if (maybeUser !== null) {
        throw createHttpError(409, "Email in use");
    }

    payload.password = await bcrypt.hash(payload.password, 10)

    return User.create(payload);
}

export const loginUser = async ({ email, password }) => {
    const maybeUser = await User.findOne({ email });

    if (maybeUser === null) {
        throw createHttpError(401, "User not found");
    }

    const isMatch = await bcrypt.compare(password, maybeUser.password);

    if (isMatch === false) {
        throw createHttpError(401, "Unauthorized");
    }

    await Session.deleteOne({ userId: maybeUser._id });

    return Session.create({
        userId: maybeUser._id,
        accessToken: crypto.randomBytes(30).toString("base64"),
        refreshToken: crypto.randomBytes(30).toString("base64"),
        accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
        refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
    })
}

export const logoutUser = async (sessionId) => {
    return await Session.deleteOne({ _id: sessionId })
}

export const refreshtUserSession = async (sessionId, refreshToken) => {
    const session = await Session.findOne({ _id: sessionId, refreshToken });
    console.log({ session });

    if (session === null) {
        throw createHttpError(401, "Session not found");
    }

    if (new Date > new Date(session.refreshTokenValidUntil)) {
        throw createHttpError(401, "Refresh expired token")
    }

    await Session.deleteOne({ _id: sessionId });

    return Session.create({
        userId: session.userId,
        accessToken: crypto.randomBytes(30).toString("base64"),
        refreshToken: crypto.randomBytes(30).toString("base64"),
        accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN_TTL),
        refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN_TTL),
    })

}

export const requestResetEmail = async (email) => {
    const user = User.findOne({ email });
    if (user === null) {
        throw createHttpError(404, "User not found");
    }

    await sendMail({
        from: SMTP.FROM_EMAIL,
        to: email,
        subject: "Reset your password",
        html: "<h1>Reset your password</h1>"
    })



}
