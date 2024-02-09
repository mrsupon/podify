//controllers/admins/product
import { Request, Response, RequestHandler } from "express";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import _ from "lodash";
import { IEmailVerify, IPasswordReset, IUser } from "../../@types/app.js";
import * as Yup from "yup";

import Validator from "../../validations/validator.js";
import Status from "http-status";
import ResetPasswordHtmlContent from "../../utils/emails/htmlContents/resetPasswordHtmlContent.js";
import Mailer from "../../utils/emails/mailer.js";
import Bcrypt from "bcrypt";
import crypto from "crypto";
import Helper from "../../utils/helper.js";
import { PasswordResetSchema } from "../../validations/auth/passwordReset.js";
import env from "../../utils/variables.js";

export default class PasswordReset {
    public prisma = new PrismaMongodb().getPrisma();

    // async index(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const notes = await prisma.user.findMany();
    //         return res.json({ notes });
    //     } catch (err) {
    //         throw err;
    //     }
    // }
    // async show(req: Request, res: Response): Promise<Response> {
    // try {
    //     const id = req.params.id;
    //     const foundNote = await prisma.note.findUnique({ where: { id: id } });
    //     if (!foundNote) {
    //         return res.json({ error: 'Note not found!' });
    //     } else {
    //         return res.json({ note: foundNote });
    //     }
    // } catch (err) {
    //     throw err;
    // }
    // }
    static async store(req: Request, res: Response): Promise<Response> {
        try {
            const { userId } = req.body as { userId: string };
            await new Validator<IPasswordReset>(PasswordResetSchema).validateAll(req.body);

            const foundUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!foundUser) {
                return res.status(Status.UNPROCESSABLE_ENTITY).json({ error: "User ID is not found." });
            }

            const foundPasswordReset = await prisma.passwordResetToken.findUnique({ where: { ownerId: foundUser.id } });
            if (foundPasswordReset) {
                const deletedEmailVerify = await prisma.passwordResetToken.delete({ where: { id: foundPasswordReset.id } });
            }

            const token = crypto.randomBytes(36).toString("hex");
            await prisma.passwordResetToken.create({ data: { ownerId: userId, token: token } });
            const resetLink = `${env.PASSWORD_RESET_LINK}?token=${token}&userId=${userId}`;

            const htmlContent = new ResetPasswordHtmlContent();
            const options = htmlContent.getOptions();
            options.message = htmlContent.getMessage({ name: foundUser.name });
            options.link = resetLink;
            options.btnTitle = "Reset Password";

            const mailer = new Mailer();
            mailer.setAttachments("logo.png", "/public/images/emailAttachments/logo.png", "logo");
            mailer.setAttachments("forget_password.png", "/public/images/emailAttachments/forget_password.png", "forget_password");

            await mailer.send(foundUser.email, "Reset Password", htmlContent.getHtmlFromEJS("/views/emails/resetPassword.ejs"));

            return res.status(Status.CREATED).json({ message: "Please check reset password link in your email.", user: foundUser });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).json({ error: error.value });
            }
            throw error;
        }
    }

    // async patch(req: Request, res: Response): Promise<Response> {
    // try {
    //     const { id } = req.params;
    //     const foundNote = await prisma.note.findUnique({ where: { id: id } });
    //     if (!foundNote) {
    //         return res.json({ error: 'Note not found!' });
    //     } else {
    //         const title = (req.body as INote).title || foundNote.title;
    //         const description = (req.body as INote).description || foundNote.description;
    //         const updatedNote = await prisma.note.update({ where: { id: id }, data: { title: title, description: description } });
    //         return res.json({ note: updatedNote });
    //     }
    // } catch (err) {
    //     throw err;
    // }
    // }
    // async destroy(req: Request, res: Response): Promise<Response> {
    // try {
    //     const { id } = req.params;
    //     const deletedNote = await prisma.note.delete({ where: { id: id } });
    //     console.log(deletedNote);
    //     if (!deletedNote) {
    //         return res.json({ error: 'Could not remove note!' });
    //     } else {
    //         return res.json({ message: 'Note removed successfully', deletedNote });
    //     }
    // } catch (err) {
    //     //throw err;
    //     return res.json({ err });
    // }
    // }
}
