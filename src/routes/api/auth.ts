//routes/web

import express, { Router, Express, Request, Response } from "express";
import RegisterUserController from "../../controllers/auth/registeredUser.js";
import EmailVerifyController from "../../controllers/auth/emailVerify.js";
import EmailReVerifyController from "../../controllers/auth/emailReVerify.js";
import PasswordResetController from "../../controllers/auth/passwordReset.js";

const router = Router();

router.post("/register", RegisterUserController.store);

router.post("/email-verify", EmailVerifyController.store);

router.post("/email-reverify", EmailReVerifyController.store);

router.post("/password-reset", PasswordResetController.store);

export default router;
