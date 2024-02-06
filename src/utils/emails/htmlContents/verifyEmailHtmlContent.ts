import HtmlContent from "../htmlContent.js";

export interface IOptions {
    title: string;
    message: string;
    link: string;
    logo: string;
    banner: string;
    btnTitle: string;
}

export default class VerifyEmailHtmlContent extends HtmlContent<IOptions> {
    constructor() {
        super();
        this.options = {
            title: "Welcome to Podify",
            message: "welcome",
            logo: "cid:logo",
            banner: "cid:welcome",
            link: "#",
            btnTitle: "Verify",
        };
    }

    getMessage(data = { name: "" }) {
        return `Hi ${data.name}, welcome to Podify! 
        There are so much thing that we do for verified users. 
        Use the given OTP to verify your email.`;
    }
}
