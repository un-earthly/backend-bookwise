import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../utils/ApiError';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error('Error:', err);

    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Server Error';

    if (err instanceof ApiError) {
        statusCode = err.status;
        message = err.message;
    }

    res.status(statusCode).json({ error: message });
}
