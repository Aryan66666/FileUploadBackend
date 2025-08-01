"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
const error_handler_1 = require("../utils/error-handler");
const jwks_utiity_1 = require("../utils/jwks-utiity");
class AuthHandler {
    static async verifyJwtToken(req) {
        try {
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                throw new error_handler_1.AppError('No Token Provided', 400);
            }
            const payload = await (0, jwks_utiity_1.verifyCognitoJwt)(token);
            return payload;
        }
        catch (err) {
            console.error(' Invalid Token:', err);
            throw new error_handler_1.AppError('Unauthorized', 401);
        }
    }
}
exports.AuthHandler = AuthHandler;
