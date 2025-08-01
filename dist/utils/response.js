"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(res, statusCode, message, data = {}) {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
}
