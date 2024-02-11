import HtmlContent from "../htmlContent.js";

export interface IOptions {
    title: string;
    message: string;
    link: string;
    logo: string;
    banner: string;
    btnTitle: string;
}

export default class NewPasswordHtmlContent extends HtmlContent<IOptions> {
    constructor() {
        super();
        this.options = {
            title: "Reset password successfully",
            message: "",
            logo: "cid:logo",
            banner: "cid:forget_password",
            link: "#",
            btnTitle: "Link",
        };
    }

    getMessage(data = { name: "" }) {
        return `Dear ${name} we just updated your new password. You can now sign in with your new password.`;
    }
}
