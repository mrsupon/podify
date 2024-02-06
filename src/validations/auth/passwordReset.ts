import Helper from "../../utils/helper.js";
import * as Yup from "yup";

export const PasswordResetSchema = Yup.object().shape({
    userID: Yup.string()
        .transform(function (value) {
            if (this.isType(value) && Helper.isValidObjectId(value)) {
                return value;
            }
            return "";
        })
        .required("ID is invalid."),
});
