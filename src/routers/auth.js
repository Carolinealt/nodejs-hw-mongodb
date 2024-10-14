import express from 'express';
import { validateBody } from '../middlewares/validateBody.js'
import { registerSchema, loginSchema, requestResetEmailSchema, resetPasswordShema } from '../validation/auth.js'
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerController, loginController, logoutController, refreshController, requestResetEmailController, resetPasswordController } from '../controllers/auth.js';

const authRouter = express.Router();
const jsonParser = express.json();

authRouter.post("/register", jsonParser, validateBody(registerSchema), ctrlWrapper(registerController));

authRouter.post("/login", jsonParser, validateBody(loginSchema), ctrlWrapper(loginController));

authRouter.post("/logout", ctrlWrapper(logoutController));

authRouter.post("/refresh", ctrlWrapper(refreshController));

authRouter.post('/send-reset-email', jsonParser, validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post('/reset-pwd', jsonParser, validateBody(resetPasswordShema), ctrlWrapper(resetPasswordController))

export default authRouter;