//controllers/admins/product
import { Request, Response, RequestHandler } from "express";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import _ from "lodash";
import { IUser } from "../../@types/app.js";
import * as Yup from "yup";
import { UserSchema } from "../../validations/userSchema.js";
import Validator from "../../validations/validator.js";
import VerifyEmailHtmlContent from "../../utils/emails/htmlContents/verifyEmailHtmlContent.js";
import Mailer from "../../utils/emails/mailer.js";
import Bcrypt from "bcrypt";
import Crypto from "crypto";
import Helper from "../../utils/helper.js";
import env from "../../utils/variables.js";
import { status } from "../../utils/httpStatus.js";

export default class ResgisteredUser {
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
            type objType = { name: string; email: string; password: string };
            const { name, email, password } = req.body as objType;
            await new Validator<objType>(UserSchema).validateAll(req.body);

            const hashedPassword = await Bcrypt.hash(password, 10);

            const newUser: IUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPassword,
                },
            });
            if (!newUser) {
                return res.status(status.UNPROCESSABLE_ENTITY_422.code).json({ error: "Could not create new user data." });
            }

            await ResgisteredUser.createVerifyandMail(newUser);

            return res.status(status.CREATED_201.code).json({ message: "Please verification at your email.", user: newUser });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return res.status(422).json({ error: error.value });
            }
            throw error;
        }
    }
    static async createVerifyandMail(user: IUser) {
        try {
            const otp = Helper.getRandomAlphanumeric(6, "0123456789", true);
            if (!otp) {
                throw Error("Could not create OTP data.");
            }
            await prisma.emailVerifyToken.create({
                data: {
                    token: await Bcrypt.hash(otp, 10),
                    ownerId: user.id,
                },
            });

            const htmlContent = new VerifyEmailHtmlContent();
            const options = htmlContent.getOptions();
            options.message = htmlContent.getMessage({ name: user.name });
            options.btnTitle = otp;

            const mailer = new Mailer();
            mailer.setAttachments("logo.png", "/public/images/emailAttachments/logo.png", "logo");
            mailer.setAttachments("welcome.png", "/public/images/emailAttachments/welcome.png", "welcome");

            await mailer.send(user.email, "Verify E-mail", htmlContent.getHtmlFromEJS("/views/emails/verifyEmail.ejs"));
        } catch (error) {
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
