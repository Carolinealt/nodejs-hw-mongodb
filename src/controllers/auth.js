import { registerUser, loginUser, logoutUser, refreshtUserSession, requestResetEmail, resetPassword } from "../services/auth.js";

export const registerController = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    const registeredUser = await registerUser(user);

    res.status(201).send({ status: 201, message: "Successfully registered a user!", data: registeredUser })
}

export const loginController = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    const session = await loginUser(user);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    })

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    })

    res.status(200).send({
        status: 200, message: "Login Successfully logged in an user!", data: {
            accessToken: session.accessToken,
        }
    })
}

export const logoutController = async (req, res) => {
    if (typeof req.cookies.sessionId === "string") {
        await logoutUser(req.cookies.sessionId);
    }

    res.clearCookie("refreshToken");
    res.clearCookie("sessionId");
    res.status(204).end()

}

export const refreshController = async (req, res) => {
    const { sessionId, refreshToken } = req.cookies;
    const session = await refreshtUserSession(sessionId, refreshToken);

    res.cookie("refreshToken", session.refreshToken, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    })

    res.cookie("sessionId", session._id, {
        httpOnly: true,
        expires: session.refreshTokenValidUntil,
    })

    res.status(200).send({
        status: 200,
        message: "Successfully refreshed a session!",
        data: {
            accessToken: session.accessToken,
        }
    })
}

export const requestResetEmailController = async (req, res) => {
    const { email } = req.body;

    await requestResetEmail(email);

    res.send({ status: 200, message: "Reset email was send succesfully", data: {} });
}

export const resetPasswordController = async (req, res) => {
    const { password, token } = req.body;

    await resetPassword(password, token);

    res.send({ status: 200, message: "Password reset succesfully", data: {} });
}

