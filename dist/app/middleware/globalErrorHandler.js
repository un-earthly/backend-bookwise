"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_codes_1 = require("http-status-codes");
const ApiError_1 = require("../../utils/ApiError");
function errorHandler(err, req, res, next) {
    console.error('Error:', err);
    let statusCode = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Server Error';
    if (err instanceof ApiError_1.ApiError) {
        statusCode = err.status;
        message = err.message;
    }
    res.status(statusCode).json({ error: message });
}
exports.errorHandler = errorHandler;
