import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import env from "../utils/env_variables.js";
import AppError from "../utils/appError.js";
import Http, { status } from "../utils/httpStatus.js";

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    const mode = env.NODE_ENV?.trim() || "development";

    const statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR_500.code;
    res.status(statusCode);

    if (mode === "production") {
        res.json({ error: { title: err.name, statusCode: statusCode, message: err.message, errors: err.errors } });
    } else {
        //development
        res.json({ error: { title: err.name, statusCode: statusCode, message: err.message, details: err, stack: err.stack } });
    }
};

const errorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    //next(createError(Status.code.NOT_FOUND_404));
    next(new AppError(status.NOT_FOUND_404.code));
};

export { errorHandler, errorNotFoundHandler };
