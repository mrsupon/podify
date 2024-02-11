//routes/web

import express, { Router, Express, Request, Response } from "express";
import { asyncMiddleware } from "../../utils/asyncMiddleware.js";

import RegisteredUserController from "../../controllers/auth/registeredUser.js";
import EmailVerifyController from "../../controllers/auth/emailVerify.js";
import EmailReVerifyNotificationController from "../../controllers/auth/emailReVerifyNotification.js";
import PasswordResetNotificationController from "../../controllers/auth/passwordResetNotification.js";
import PasswordResetVerifyController from "../../controllers/auth/passwordResetVerify.js";
import NewPasswordController from "../../controllers/auth/newPassword.js";

const router = Router();

router.use("/api/auth", [
    router.post("/signup", asyncMiddleware(RegisteredUserController.store)),

    router.post("/email-verify", asyncMiddleware(EmailVerifyController.store)),

    router.post("/email-reverify-notification", asyncMiddleware(EmailReVerifyNotificationController.store)),

    router.post("/password-reset-notification", asyncMiddleware(PasswordResetNotificationController.store)),

    router.post("/password-reset-verify", asyncMiddleware(PasswordResetVerifyController.store)),

    router.post("/password-reset", asyncMiddleware(NewPasswordController.store)),
]);

export default router;
