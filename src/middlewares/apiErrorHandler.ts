import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import env from "../utils/env_variables.js";
import AppError from "../utils/appError";

const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction): void => {
    const mode = env.NODE_ENV?.trim() || "development";

    const statusCode = err.statusCode || 500;
    res.status(statusCode);

    if (mode === "production") {
        res.json({ error: { title: err.name, statusCode: statusCode, message: err.message } });
    } else {
        //development
        res.json({ error: { title: err.name, statusCode: statusCode, message: err.message, details: err, stack: err.stack } });
    }
};

const errorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(createError(404));
};

export { errorHandler, errorNotFoundHandler };
