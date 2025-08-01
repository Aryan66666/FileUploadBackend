"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = require("./app");
const uri = process.env.MONGOURL;
const port = process.env.PORT || 3000;
(async () => {
    try {
        if (!uri) {
            console.error('MONGOURL is not defined in .env');
            process.exit(1);
        }
        await mongoose_1.default.connect(uri);
        console.log("DB Connected");
        app_1.app.listen(port, () => {
            console.log(`Server Started On http://localHost:${port}`);
        });
    }
    catch (err) {
        console.error(' DB connection failed:', err);
        process.exit(1);
    }
})();
