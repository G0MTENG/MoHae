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
exports.UserController = void 0;
const image_1 = require("../utils/image");
const services_1 = require("../services");
exports.UserController = {
    user: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.user;
            if (!user) {
                throw new Error('유저를 찾을 수 없습니다.');
            }
            const userId = user.id;
            const userInfo = yield services_1.UserService.info(userId);
            if (!userInfo) {
                throw new Error('유저 정보를 찾을 수 없습니다.');
            }
            res.send(userInfo);
        }
        catch (error) {
            console.error(error);
            res.status(500).send('에러가 발생했습니다.');
        }
    }),
    updateProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const avatar = req.file;
            const username = req.body.username;
            if (!username) {
                res.status(400).send('username이 필요합니다.');
                return;
            }
            const user = req.user;
            if (!user) {
                res.status(401).send('로그인이 필요합니다.');
                return;
            }
            if (avatar) {
                yield services_1.UserService.update(user.id, { username, avatar: (0, image_1.parseImageUrl)(avatar) });
            }
            else {
                yield services_1.UserService.update(user.id, { username });
            }
            res.send({
                message: '프로필이 업데이트 되었습니다.',
            });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).send('에러가 발생했습니다.');
        }
    }),
};
