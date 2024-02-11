//controllers/admins/product
import { Request, Response, RequestHandler } from "express";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import _ from "lodash";
import * as Yup from "yup";

import Validator from "../../validations/validator.js";
import { status } from "../../utils/httpStatus.js";
import { EmailReVarifyNotificationSchema } from "../../validations/auth/emailReVerifyNotification.js";
import RegisterUserController from "./registeredUser.js";
import AppError from "../../utils/appError.js";

export default class EmailReVerifyNotification {
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
            type objType = { userId: string };
            const { userId } = req.body as objType;
            await new Validator<objType>(EmailReVarifyNotificationSchema).validateAll(req.body);

            const foundUser = await prisma.user.findUnique({ where: { id: userId } });
            if (!foundUser) {
                throw new AppError(status.UNPROCESSABLE_ENTITY_422.code, "User ID is not found.");
            }

            if (!foundUser.verifiedAt) {
                const foundEmailVerify = await prisma.emailVerifyToken.findUnique({ where: { ownerId: foundUser.id } });
                if (foundEmailVerify) {
                    const deletedEmailVerify = await prisma.emailVerifyToken.delete({ where: { id: foundEmailVerify.id } });
                }

                await RegisterUserController.createVerifyandMail(foundUser);
                return res.status(status.CREATED_201.code).json({ message: "Please check your email.", user: foundUser });
            } else {
                throw new AppError(status.UNPROCESSABLE_ENTITY_422.code, "This user had verified already.");
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                //return res.status(status.UNPROCESSABLE_ENTITY_422.code).json({ error: error.value });
                throw new AppError(status.BAD_REQUEST_400.code, "Validation error", error.value);
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
