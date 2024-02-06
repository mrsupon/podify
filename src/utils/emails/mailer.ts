import nodemailer from "nodemailer";
import "dotenv/config";
import _ from "lodash";
import path from "path";
import Helper from "../../utils/helper.js";
import env from "../variables.js";

export default class Mailer {
    private transport;
    private smtpOptions;
    private mailOptions;
    constructor() {
        this.smtpOptions = {
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: env.MAILTRAP_USER,
                pass: env.MAILTRAP_PASS,
            },
        };

        this.transport = nodemailer.createTransport(this.smtpOptions);
        this.mailOptions = {
            from: process.env.VERIFY_EMAIL,
            to: "",
            subject: "Podify Email",
            text: "",
            html: "",
            attachments: [] as {}[],
        };
    }

    getSmtpOptions() {
        return this.smtpOptions;
    }
    getMailOptions() {
        return this.mailOptions;
    }
    setAttachments(filename: string, filePath: string, cid: string) {
        this.mailOptions.attachments = _.concat(this.mailOptions.attachments, [{ filename: filename, path: path.join(Helper.__dir, filePath), cid: cid }]);
    }

    async send(to = "", subject = "", content = "") {
        try {
            let message;
            this.mailOptions.to = to;
            this.mailOptions.subject = subject;
            this.mailOptions.html = content;
            const result = await this.transport.sendMail(this.mailOptions);
            //console.dir(result, Infinity);
            return result;
        } catch (err) {
            throw err;
        }
    }
}
