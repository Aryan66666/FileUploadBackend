"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const error_handler_1 = require("./error-handler");
class AuthService {
    constructor(awsService, repository) {
        this.awsService = awsService;
        this.repository = repository;
        this.awsService = awsService;
        this.repository = repository;
    }
    async signUp(data, file) {
        if (data.password !== data.confirmPassword) {
            throw new error_handler_1.AppError("Passwords do not match", 400);
        }
        const user = await this.awsService.signUp(data);
        if (file) {
            const profilePhoto = await this.awsService.uploadileToS3(file, `User Details/userProfilePhotos/${data.username}/${file.originalname}`);
            data.profilePhoto = `${data.username}/${file.originalname}`;
        }
        await this.repository.createUser(data);
        return user;
    }
    async confirmSignUp(data) {
        const result = await this.awsService.confirmSignUp(data);
        if (!result) {
            throw new error_handler_1.AppError("Confirmation Failed", 400);
        }
        return result;
    }
    async signIn(dto) {
        const user = await this.awsService.signIn(dto);
        if (!user) {
            throw new error_handler_1.AppError("Sign In Failed", 400);
        }
        return user;
    }
}
exports.AuthService = AuthService;
