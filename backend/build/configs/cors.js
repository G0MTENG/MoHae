"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: [
        'http://mohae-front-deploy.s3-website.ap-northeast-2.amazonaws.com',
        'http://localhost:5173',
    ],
    credentials: true,
    optionsSuccessStatus: 204,
};
