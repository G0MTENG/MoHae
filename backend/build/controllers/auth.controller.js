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
exports.AuthController = void 0;
const services_1 = require("../services");
const utils_1 = require("../utils");
exports.AuthController = {
    signIn: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const user = yield services_1.UserService.findUserByEmail(email);
            if (!user) {
                res.status(404).send({
                    message: '가입되지 않은 이메일입니다.',
                });
                return;
            }
            const hashPassword = (0, utils_1.makeHash)(password);
            if (user.password !== hashPassword) {
                res.status(401).send({
                    message: '비밀번호가 일치하지 않습니다',
                });
                return;
            }
            const accessToken = services_1.JWTService.generateToken({ id: user.id, name: user.username }, 'ACCESS');
            const refreshToken = services_1.JWTService.generateToken({ id: user.id, name: user.username }, 'REFRESH');
            res.send({
                accessToken,
                refreshToken,
            });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: '로그인 중 오류가 발생했습니다.',
            });
            return;
        }
    }),
    signUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, email, password } = req.body;
        try {
            const isDuplicateEmail = yield services_1.UserService.isDuplicateEmail(email);
            if (isDuplicateEmail) {
                res.status(409).send({
                    message: '이미 사용중인 이메일입니다.',
                });
                return;
            }
            const hashPassword = (0, utils_1.makeHash)(password);
            yield services_1.UserService.signUp({ username, email, password: hashPassword });
            res.status(200).send({
                message: '정상적으로 회원가입되었습니다.',
            });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).send({
                message: '회원가입 중 오류가 발생했습니다.',
            });
            return;
        }
    }),
};
