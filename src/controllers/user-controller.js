"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = (0, class_transformer_1.plainToInstance)(userSignDTO_1.UserSignUpDTO, req.body);
            const error = yield (0, class_validator_1.validate)(model);
            if (error.length > 0) {
                next(error);
            }
            const result = yield this.authHandler.signUp(model, req === null || req === void 0 ? void 0 : req.file);
            const file = req === null || req === void 0 ? void 0 : req.file;
            return (0, response_1.sendResponse)(res, 201, "User signed up succesfully", result);
        });
    }
    confirmSignUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = (0, class_transformer_1.plainToInstance)(userSignDTO_1.ConfirmSignUpDto, req.body);
            const error = yield (0, class_validator_1.validate)(model);
            if (error.length) {
                next(error);
            }
            const result = yield this.authHandler.confirmSignUp(model);
            yield this.repository.updateUserVerficationStatus(model.username);
            return (0, response_1.sendResponse)(res, 200, "User Confirmed successfully", result);
        });
    }
    resendConfirmationCode(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const username = req.body.email;
            if (!username) {
                return (0, response_1.sendResponse)(res, 400, "Email is required");
            }
            const awsService = new aws_service_1.AwsService();
            const result = yield awsService.resendConfirmationCode(username);
            return (0, response_1.sendResponse)(res, 200, "Code sent succesfully", result);
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = (0, class_transformer_1.plainToInstance)(userSignDTO_1.SignInDto, req.body);
            const error = yield (0, class_validator_1.validate)(model);
            if (error.length) {
                next(error);
            }
            const result = yield this.authHandler.signIn(model);
            if (result.AuthenticationResult) {
                return (0, response_1.sendResponse)(res, 200, "User signed in successfully", result);
            }
            else {
                return (0, response_1.sendResponse)(res, 400, "Sign in failed", null);
            }
        });
    }
}
exports.UserController = UserController;
