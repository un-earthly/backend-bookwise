import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('Error:', err);

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Server Error';

    if (err.name === 'ValidationError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = err.message;
    } else if (err.name === 'CastError') {
        statusCode = StatusCodes.BAD_REQUEST;
        message = 'Invalid ID';
    }

    res.status(statusCode).json({ error: message });
}
