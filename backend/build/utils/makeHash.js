"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeHash = void 0;
const crypto_1 = require("crypto");
const makeHash = (password) => {
    return (0, crypto_1.createHash)('sha512').update(password).digest('base64');
};
exports.makeHash = makeHash;
