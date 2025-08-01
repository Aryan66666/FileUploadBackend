"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user-controller");
const auth_service_1 = require("../utils/auth-service");
const aws_service_1 = require("../utils/aws-service");
const user_repository_1 = require("../repositories/user-repository");
const multer_service_1 = require("../middlewares/multer-service");
const router = (0, express_1.Router)();
const awsService = new aws_service_1.AwsService();
const repository = new user_repository_1.UserRepository();
const authService = new auth_service_1.AuthService(awsService, repository);
const controller = new user_controller_1.UserController(authService, repository);
router
    .post("/signup", multer_service_1.singleFileUpload, multer_service_1.validateFile, controller.signup.bind(controller))
    .post("/confirm-signup", controller.confirmSignUp.bind(controller))
    .post("/resend-confirmation-code", controller.resendConfirmationCode.bind(controller))
    .post("/sign-in", controller.signIn.bind(controller));
exports.default = router;
