"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFile = exports.singleFileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const error_handler_1 = require("../utils/error-handler");
exports.singleFileUpload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
}).single('profilePhoto');
const validateFile = (req, res, next) => {
    const file = req.file;
    if (!file) {
        return next();
    }
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.mimetype)) {
        return next(new error_handler_1.AppError('Invalid file type. Only JPEG, PNG, and PDF files are allowed.', 400));
    }
    if (file.size > 5 * 1024 * 1024) {
        return next(new error_handler_1.AppError('File size exceeds the limit of 5 MB.', 400));
    }
    next();
};
exports.validateFile = validateFile;
