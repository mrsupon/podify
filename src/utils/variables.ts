import "dotenv/config";

//const { env } = process as { env: { [kes: string]: string } };
const e = process.env;
const env = {
    PORT: e.PORT,
    DATABASE_URL: e.DATABASE_URL,
    MAILTRAP_USER: e.MAILTRAP_USER,
    MAILTRAP_PASS: e.MAILTRAP_PASS,
    VERIFY_EMAIL: e.MAILTRAP_USER,
    PASSWORD_RESET_LINK: e.PASSWORD_RESET_LINK,
};

export default env;
