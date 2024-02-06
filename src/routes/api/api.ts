//routes/web

import createError from "http-errors";
import express, { Router, Express, Request, Response } from "express";

import RegisterUserController from "../../controllers/auth/registeredUser.js";
import EmailVerifyController from "../../controllers/auth/emailVerify.js";
import EmailReVerifyController from "../../controllers/auth/emailReVerify.js";
import PasswordResetController from "../../controllers/auth/passwordReset.js";

import Auth from "./auth.js";

const router = Router();
//router.use("/api/auth", Auth);
router.use("/api/auth", [
    router.post("/register", RegisterUserController.store),

    router.post("/email-verify", EmailVerifyController.store),

    router.post("/email-reverify", EmailReVerifyController.store),

    router.post("/password-reset", PasswordResetController.store),
]);

export default router;
