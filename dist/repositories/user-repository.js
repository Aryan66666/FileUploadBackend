"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const argon2_1 = __importDefault(require("argon2"));
const user_model_1 = __importDefault(require("../models/user-model"));
const error_handler_1 = require("../utils/error-handler");
class UserRepository {
    async createUser(userData) {
        const { username, email, userType } = userData;
        let password = userData.password;
        const name = userData?.name ?? username;
        const profilePhoto = userData?.profilePhoto ?? null;
        const isVerified = false;
        password = await argon2_1.default.hash(password);
        const user = {
            name: name,
            username: username,
            password: password,
            email: email,
            userType: +userType,
            profilePhoto: profilePhoto,
            isVerified: isVerified,
        };
        const userModel = new user_model_1.default(user);
        await userModel.save();
        console.log("User created succesfully in the db");
    }
    async updateUserVerficationStatus(username) {
        const user = await user_model_1.default.findOne({ username: username });
        if (!user) {
            throw new error_handler_1.AppError("User Not found", 404);
        }
        user.isVerified = true;
        await user.save();
        console.log("User verification status updated succesfully");
    }
}
exports.UserRepository = UserRepository;
