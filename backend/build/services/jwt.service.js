"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTService {
    static generateToken(payload, keyType, options) {
        return jsonwebtoken_1.default.sign(payload, this.JWTKeys[keyType], Object.assign({ expiresIn: keyType === 'ACCESS' ? '30m' : '14d' }, options));
    }
    static verifyToken(token, keyType, options) {
        try {
            return jsonwebtoken_1.default.verify(token, this.JWTKeys[keyType], options);
        }
        catch (error) {
            return null;
        }
    }
}
exports.JWTService = JWTService;
JWTService.JWTKeys = {
    REFRESH: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    ACCESS: process.env.JWT_ACCESS_SECRET || 'access_secret',
};
