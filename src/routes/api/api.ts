//routes/web

import express, { Router, Express, Request, Response } from "express";
import { toMiddleware } from "../../utils/toMiddleware.js";

import RegisterUserController from "../../controllers/auth/registeredUser.js";
import EmailVerifyController from "../../controllers/auth/emailVerify.js";
import EmailReVerifyController from "../../controllers/auth/emailReVerify.js";
import PasswordResetController from "../../controllers/auth/passwordReset.js";

const router = Router();

router.use("/api/auth", [
    router.post("/register", toMiddleware(RegisterUserController.store)),

    router.post("/email-verify", toMiddleware(EmailVerifyController.store)),

    router.post("/email-reverify", toMiddleware(EmailReVerifyController.store)),

    router.post("/password-reset", toMiddleware(PasswordResetController.store)),
]);

export default router;
