"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccessResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
function sendSuccessResponse(res, data, statusCode = http_status_codes_1.StatusCodes.OK) {
    res.status(statusCode).json({ data });
}
exports.sendSuccessResponse = sendSuccessResponse;
