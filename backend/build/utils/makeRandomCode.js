"use strict";
// 6자리 random string을 생성한다.
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeRandomCode = void 0;
const makeRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomCode = '';
    for (let i = 0; i < 6; i++) {
        randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomCode;
};
exports.makeRandomCode = makeRandomCode;
