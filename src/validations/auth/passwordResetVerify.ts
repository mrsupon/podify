import Helper from "../../utils/helper.js";
import * as Yup from "yup";

export const PasswordResetVerifySchema = Yup.object().shape({
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
