import { StatusCodes } from 'http-status-codes';

export class ApiError extends Error {
    status: number;
    isOperational: boolean;

    constructor(message: string, status: number = StatusCodes.INTERNAL_SERVER_ERROR, isOperational: boolean = true) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
