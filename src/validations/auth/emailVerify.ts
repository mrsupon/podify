import Helper from "../../utils/helper.js";
import * as Yup from "yup";

export const EmailVarifySchema = Yup.object().shape({
    token: Yup.string().trim().required("OTP is invalid."),
    ownerId: Yup.string()
        .transform(function (value) {
            console.log(value);
            if (this.isType(value) && Helper.isValidObjectId(value)) {
                return value;
            }
            return "";
        })
        .required("ID is invalid."),
});
