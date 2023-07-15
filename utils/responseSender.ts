import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function sendSuccessResponse(res: Response, data: any, statusCode = StatusCodes.OK) {
    res.status(statusCode).json({ data });
}
