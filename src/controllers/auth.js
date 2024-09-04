import { registerUser, loginUser } from "../services/auth.js";

export const registerController = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }

    const registeredUser = await registerUser(user);

    res.send({ status: 200, message: "User registered", data: registeredUser })
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

    res.send({
        status: 200, message: "Login completed", data: {
            accessToken: session.accessToken,
        }
    })
}
