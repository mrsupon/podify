import * as Yup from "yup";
import Helper from "../utils/helper.js";
import PrismaMongodb, { prisma } from "../databases/mongodb/prisma.js";
import Bcrypt from "bcrypt";

export default class Schema {
    static RegisteredUser = Yup.object().shape({
        name: Yup.string().trim().required("Name is missing.").min(3, "Name is too short.").max(20, "Name is too long."),
        email: Yup.string().trim().required("Email is missing.").email("Email is invalid."),
        password: Yup.string()
            .trim()
            .required("Password is missing.")
            .min(8, "Password is too short.")
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,15}$/, "Password is invalid."),
    });

    static EmailReVarify = Yup.object().shape({
        userId: Yup.string()
            .transform(function (value) {
                if (this.isType(value) && Helper.isValidObjectId(value)) {
                    return value;
                }
                return "";
            })
            .required("ID is invalid."),
    });

    static EmailVerify = Yup.object().shape({
        token: Yup.string().trim().required("Token is invalid."),
        userId: Yup.string()
            .transform(function (value) {
                console.log(value);
                if (this.isType(value) && Helper.isValidObjectId(value)) {
                    return value;
                }
                return "";
            })
            .required("ID is invalid."),
    });

    static NewPassword = Yup.object().shape({
        userId: Yup.string()
            .transform(function (value) {
                if (this.isType(value) && Helper.isValidObjectId(value)) {
                    return value;
                }
                return "";
            })
            .required("ID is invalid."),
        newPassword: Yup.string()
            .trim()
            .required("Password is missing.")
            .min(8, "Password is too short.")
            .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,15}$/, "Password is invalid.")
            .test("New password is valid.", "New passwords must be different from old password.", async (value, context) => {
                try {
                    const prisma = new PrismaMongodb().getPrisma();
                    const userId = context.parent.userId;
                    const foundUser = await prisma.user.findUnique({ where: { id: userId } });
                    if (!foundUser) {
                        throw new Error("User data not found");
                    } else {
                        const match = await Bcrypt.compare(value, foundUser.password);
                        return !match;
                    }
                } catch (error) {
                    // if (error instanceof Yup.ValidationError) {
                    //     throw new Yup.ValidationError("Validation unprocessable", "Error", "newPassword");
                    //     //throw context.createError({ message: "Validation error" });
                    // }
                    throw error;
                }
            }),
    });

    static PasswordReset = Yup.object().shape({
        userId: Yup.string()
            .transform(function (value) {
                if (this.isType(value) && Helper.isValidObjectId(value)) {
                    return value;
                }
                return "";
            })
            .required("ID is invalid."),
    });

    static PasswordResetVarify = Yup.object().shape({
        token: Yup.string().trim().required("Token is invalid."),
        userId: Yup.string()
            .transform(function (value) {
                if (this.isType(value) && Helper.isValidObjectId(value)) {
                    return value;
                }
                return "";
            })
            .required("ID is invalid."),
    });
}
