import * as Yup from "yup";

export const RegisterUserSchema = Yup.object().shape({
    name: Yup.string().trim().required("Name is missing.").min(3, "Name is too short.").max(20, "Name is too long."),
    email: Yup.string().trim().required("Email is missing.").email("Email is invalid."),
    password: Yup.string()
        .trim()
        .required("Password is missing.")
        .min(8, "Password is too short.")
        .matches(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*[\W_\x7B-\xFF]).{8,15}$/, "Password is invalid."),
});
