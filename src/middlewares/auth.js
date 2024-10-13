import createHttpError from "http-errors";
import * as authServices from "../services/auth.js"
export const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;

    if (typeof authorization !== "string") {
        return next(createHttpError(401, "Please, provide Authorization header"));
    }

    const [bearer, accessToken] = authorization.split(" ", 2);

    if (bearer !== "Bearer" || typeof accessToken !== "string") {
        return next(createHttpError(401, "Auth header should be type of Bearer"));
    }

    const session = await authServices.findSessionByAccessToken(accessToken);
    if (session === null) {
        next(createHttpError(401, "Session not found"))
    }

    const user = await authServices.findUser({ _id: session.userId });
    if (user === null) {
        next(createHttpError(401, "User is not found"));
    }

    if (new Date > new Date(session.accessTokenValidUntil)) {
        next(createHttpError(401, "Access token is expired"))
    }

    req.user = user;

    next();

}