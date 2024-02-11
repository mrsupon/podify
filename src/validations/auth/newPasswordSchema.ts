import Helper from "../../utils/helper.js";
import PrismaMongodb, { prisma } from "../../databases/mongodb/prisma.js";
import Bcrypt from "bcrypt";
import * as Yup from "yup";

export const NewPasswordSchema = Yup.object().shape({
    userId: Yup.string()
        .transform(function (value) {
            if (this.isType(value) && Helper.isValidObjectId(value)) {
                return value;
            }
            return "";
        })
        .required("User ID is invalid.")
        .test("", "Unauthorized access.", async (value, context) => {
            try {
                const foundData = await prisma.passwordResetToken.findUnique({ where: { ownerId: value } });
                return !foundData ? false : true;
            } catch (error) {
                throw error;
            }
        }),

    newPassword: Yup.string()
        .trim()
        .required("Password is missing.")
        .min(8, "Password is too short.")
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,15}$/, "Password is too simple.")
        .test("", "New passwords must be different from old password.", async (value, context) => {
            try {
                const foundData = await prisma.user.findUnique({ where: { id: context.parent.userId } });
                if (!foundData) {
                    throw context.createError({ message: "No user has this password.", path: "userId" });
                }

                const match = await Bcrypt.compare(value, foundData.password);
                return !match;
            } catch (error) {
                throw error;
            }
        }),
});
