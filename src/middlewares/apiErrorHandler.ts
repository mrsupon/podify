import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

declare type WebError = Error & { status?: number };
const errorHandler = (err: WebError, req: Request, res: Response, next: NextFunction): void => {
    // set locals, only providing error in development
    //res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: { title: err.name, message: err.message } });
};

const errorNotFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    next(createError(404));
};

export { errorHandler, errorNotFoundHandler };
