import HttpStatus from "../utils/httpStatus.js";

export default class AppError extends Error {
    public statusCode;
    // public status;
    public isOperational;
    public errors;
    constructor(statusCode: number, message?: string, errors?: object) {
        super(!message ? HttpStatus.getMessage(statusCode) : message);
        this.statusCode = statusCode;
        //this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
        this.isOperational = true;
        this.errors = errors;
        Error.captureStackTrace(this, this.constructor);
    }
}
