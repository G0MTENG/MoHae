"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: [
        'https://mohae.ap-northeast-2.elasticbeanstalk.com',
        'http://mohae.ap-northeast-2.elasticbeanstalk.com'
    ],
    credentials: true,
    optionsSuccessStatus: 204,
};
