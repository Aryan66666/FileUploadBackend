"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const userSignDTO_1 = require("../dtos/userSignDTO");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const response_1 = require("../utils/response");
const aws_service_1 = require("../utils/aws-service");
class UserController {
    constructor(authHandler, repository) {
        this.authHandler = authHandler;
        this.repository = repository;
        this.authHandler = authHandler;
        this.repository = repository;
    }
    async signup(req, res, next) {
        const model = (0, class_transformer_1.plainToInstance)(userSignDTO_1.UserSignUpDTO, req.body);
        const error = await (0, class_validator_1.validate)(model);
        if (error.length > 0) {
            next(error);
        }
        const result = await this.authHandler.signUp(model, req?.file);
        const file = req?.file;
        return (0, response_1.sendResponse)(res, 201, "User signed up succesfully", result);
    }
    async confirmSignUp(req, res, next) {
        const model = (0, class_transformer_1.plainToInstance)(userSignDTO_1.ConfirmSignUpDto, req.body);
        const error = await (0, class_validator_1.validate)(model);
        if (error.length) {
            next(error);
        }
        const result = await this.authHandler.confirmSignUp(model);
        await this.repository.updateUserVerficationStatus(model.username);
        return (0, response_1.sendResponse)(res, 200, "User Confirmed successfully", result);
    }
    async resendConfirmationCode(req, res, next) {
        const username = req.body.email;
        if (!username) {
            return (0, response_1.sendResponse)(res, 400, "Email is required");
        }
        const awsService = new aws_service_1.AwsService();
        const result = await awsService.resendConfirmationCode(username);
        return (0, response_1.sendResponse)(res, 200, "Code sent succesfully", result);
    }
    async signIn(req, res, next) {
        const model = (0, class_transformer_1.plainToInstance)(userSignDTO_1.SignInDto, req.body);
        const error = await (0, class_validator_1.validate)(model);
        if (error.length) {
            next(error);
        }
        const result = await this.authHandler.signIn(model);
        if (result.AuthenticationResult) {
            return (0, response_1.sendResponse)(res, 200, "User signed in successfully", result);
        }
        else {
            return (0, response_1.sendResponse)(res, 400, "Sign in failed", null);
        }
    }
}
exports.UserController = UserController;
