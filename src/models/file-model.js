"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const enums_1 = require("../utils/enums");
const fileSchema = new mongoose_1.Schema({
    originalName: { type: String, required: true },
    storedName: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    size: { type: Number, required: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    visibility: { type: String, enum: Object.values(enums_1.Visibility), required: true },
    storagePath: { type: String, required: true },
    tags: { type: [String], default: [] },
}, { timestamps: { createdAt: 'uploadedAt', updatedAt: false } });
const FileModel = (0, mongoose_1.model)('File', fileSchema);
exports.default = FileModel;
