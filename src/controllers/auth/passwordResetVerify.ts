//controllers/admins/product
import { Request, Response, RequestHandler } from "express";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import _ from "lodash";
import * as Yup from "yup";

import Validator from "../../validations/validator.js";
import { status } from "../../utils/httpStatus.js";
import { PasswordResetVerifySchema } from "../../validations/auth/passwordResetVerify.js";
import AppError from "../../utils/appError.js";

export default class PasswordResetVerify {
    public prisma = new PrismaMongodb().getPrisma();

    static async store(req: Request, res: Response): Promise<Response> {
        try {
            type objType = { userId: string; token: string };
            const { userId, token } = req.body as objType;
            await new Validator<objType>(PasswordResetVerifySchema).validateAll(req.body);

            const foundData = await prisma.passwordResetToken.findUnique({ where: { ownerId: userId } });
            if (!foundData) {
                throw new AppError(status.UNPROCESSABLE_ENTITY_422.code, "Unauthorized access, invalid token.");
            }

            const match = token === foundData.token;
            if (!match) {
                throw new AppError(status.UNPROCESSABLE_ENTITY_422.code, "Unauthorized access, invalid token.");
            }

            return res.status(status.CREATED_201.code).json({ message: "Your token is valid." });
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // return res.status(status.UNPROCESSABLE_ENTITY_422.code).json({ error: error.value });
                throw new AppError(status.BAD_REQUEST_400.code, "Validation error", error.value);
            }
            throw error;
        }
    }
}
