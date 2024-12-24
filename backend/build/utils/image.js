"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImageUrl = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const parseImageUrl = (image) => {
    const imagePath = image.path.split('public')[1];
    return `${process.env.API_URL}/public${imagePath}`;
};
exports.parseImageUrl = parseImageUrl;
