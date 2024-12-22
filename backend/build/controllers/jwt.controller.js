"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTController = void 0;
const services_1 = require("../services");
exports.JWTController = {
    refresh: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const authorization = req.headers.authorization || '';
        try {
            if (!authorization) {
                throw new Error('토큰이 존재하지 않습니다.');
            }
            const refreshToken = authorization.split('Bearer ')[1];
            const decoded = services_1.JWTService.verifyToken(refreshToken, 'REFRESH');
            if (!decoded) {
                throw new Error('유효하지 않은 토큰입니다.');
            }
            if (typeof decoded === 'string' || !('id' in decoded || 'name' in decoded)) {
                throw new Error('decoded 타입가드 에러입니다.');
            }
            const { id, name } = decoded;
            const user = yield services_1.UserService.findUser({ id, username: name });
            if (!user) {
                throw new Error('사용자를 찾을 수 없습니다');
            }
            const accessToken = services_1.JWTService.generateToken({ id: user.id, name: user.username }, 'ACCESS');
            res.send({
                accessToken,
            });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: '토큰 재발급 중 오류가 발생했습니다.',
            });
            return;
        }
    }),
    access: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authorization = req.headers.authorization || '';
        try {
            if (!authorization) {
                throw new Error('JWT ERROR: 토큰이 존재하지 않습니다.');
            }
            const token = authorization.split('Bearer ')[1];
            const decoded = services_1.JWTService.verifyToken(token, 'ACCESS');
            if (!decoded) {
                throw new Error('JWT ERROR: 유효하지 않은 토큰입니다.');
            }
            if (typeof decoded === 'string' || !('id' in decoded || 'name' in decoded)) {
                throw new Error('JWT ERROR: decoded 타입가드 에러입니다.');
            }
            const { id, name } = decoded;
            const user = yield services_1.UserService.findUser({ id, username: name });
            if (!user) {
                throw new Error('JWT ERROR: 유저가 존재하지 않습니다.');
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401).send({
                message: '유효하지 않은 토큰입니다.',
            });
            return;
        }
    }),
};
