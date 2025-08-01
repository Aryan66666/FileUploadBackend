"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userType: { type: Number, required: true },
    profilePhoto: { type: String },
    isVerified: { type: Boolean, required: true },
    password: { type: String, required: true },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('User', userSchema);
exports.default = UserModel;
