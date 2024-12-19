"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseImageUrl = void 0;
const parseImageUrl = (image) => {
    const imagePath = image.path.split('public')[1];
    return `http://localhost:3000/public${imagePath}`;
};
exports.parseImageUrl = parseImageUrl;
