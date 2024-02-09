//controllers/admins/product
import { Request, Response, RequestHandler } from "express";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import _ from "lodash";
import { IEmailVerify, IUser } from "../../@types/app.js";
import * as Yup from "yup";
import { EmailVarifySchema } from "../../validations/auth/emailVerify.js";

import Validator from "../../validations/validator.js";
import Status from "http-status";
import Mailer from "../../utils/emails/mailer.js";
import Bcrypt from "bcrypt";
import crypto from "crypto";
import Helper from "../../utils/helper.js";

export default class EmailVerify {
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
            const { ownerId, token } = req.body as IEmailVerify;
            await new Validator<IEmailVerify>(EmailVarifySchema).validateAll(req.body);

            const user = await prisma.user.findUnique({ where: { id: ownerId } });
            if (!user) {
                return res.status(Status.UNPROCESSABLE_ENTITY).json({ error: "User not found." });
            }
            const verifyData = await prisma.emailVerifyToken.findFirst({ where: { ownerId: user.id } });
            if (verifyData && (await Bcrypt.compare(token, verifyData.token))) {
                prisma.$transaction(async (p) => {
                    await prisma.user.update({ where: { id: ownerId }, data: { verifiedAt: new Date() } });
                    await prisma.emailVerifyToken.delete({ where: { id: verifyData.id } });
                });
                return res.status(200).json({ message: "E-mail is verified" });
            } else {
                return res.status(Status.BAD_REQUEST).json({ error: "Wrong OTP" });
            }
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
