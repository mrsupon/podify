//controllers/admins/product
import { Request, Response, RequestHandler } from "express";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import _ from "lodash";
import { IUser } from "../../@types/app.js";
import * as Yup from "yup";
import { NewPasswordSchema } from "../../validations/auth/newPasswordSchema.js";
import Validator from "../../validations/validator.js";
import VerifyEmailHtmlContent from "../../utils/emails/htmlContents/verifyEmailHtmlContent.js";
import Mailer from "../../utils/emails/mailer.js";
import Bcrypt from "bcrypt";
import Crypto from "crypto";
import Helper from "../../utils/helper.js";
import env from "../../utils/variables.js";
import { status } from "../../utils/httpStatus.js";
import AppError from "../../utils/appError.js";

export default class NewPassword {
    static async store(req: Request, res: Response): Promise<Response> {
        try {
            type objType = { userId: string; newPassword: string };
            const { userId, newPassword } = req.body as objType;
            await new Validator<objType>(NewPasswordSchema).validateAll(req.body);

            const foundData = await prisma.passwordResetToken.findUnique({ where: { ownerId: userId } });
            if (!foundData) {
                throw new AppError(status.UNPROCESSABLE_ENTITY_422.code, "Token not found.");
            } else {
                const hashedPassword = await Bcrypt.hash(newPassword, 10);
                const updatedUser = await prisma.user.update({ where: { id: userId }, data: { password: hashedPassword } });
                await prisma.passwordResetToken.delete({ where: { ownerId: userId } });

                const htmlContent = new VerifyEmailHtmlContent();
                const options = htmlContent.getOptions();
                options.message = htmlContent.getMessage({ name: updatedUser.name });
                options.link = `${env.LOGIN_URL}`;
                options.btnTitle = "Login";

                const mailer = new Mailer();
                mailer.setAttachments("logo.png", "/public/images/emailAttachments/logo.png", "logo");
                mailer.setAttachments("welcome.png", "/public/images/emailAttachments/welcome.png", "welcome");

                await mailer.send(updatedUser.email, "Reset password successfully", htmlContent.getHtmlFromEJS("/views/emails/newPassword.ejs"));

                return res.status(status.CREATED_201.code).json({ message: "Change password successfully, please verification at your email." });
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).json({ error: error.value });
            }
            throw error;
        }
    }
}
