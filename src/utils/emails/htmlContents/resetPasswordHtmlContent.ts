import HtmlContent from "../htmlContent.js";

export interface IOptions {
    title: string;
    message: string;
    link: string;
    logo: string;
    banner: string;
    btnTitle: string;
}

export default class ResetPasswordHtmlContent extends HtmlContent<IOptions> {
    constructor() {
        super();
        this.options = {
            title: "Reset your password",
            message: "",
            logo: "cid:logo",
            banner: "cid:forget_password",
            link: "#",
            btnTitle: "Link",
        };
    }

    getMessage(data = { name: "" }) {
        return `Hi ${data.name}, We just received a request that you forgot your password. 
        No problem you can use the link below and create brand new password.`;
    }
}
