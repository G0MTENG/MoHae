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
exports.ChatController = void 0;
const services_1 = require("../services");
exports.ChatController = {
    with: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const roomdId = Number(req.params.id);
            const friendId = yield services_1.ChatService.findWith(userId, roomdId);
            if (!friendId) {
                res.status(404).send({ message: '친구 정보가 존재하지 않습니다.' });
                return;
            }
            const friendUser = yield services_1.UserService.findUserById(friendId);
            const recentActivity = yield services_1.ActivityService.recent(friendId);
            const emoji = (recentActivity === null || recentActivity === void 0 ? void 0 : recentActivity.emoji) || '';
            if (!friendUser) {
                res.status(404).send({ message: '친구 정보가 존재하지 않습니다.' });
                return;
            }
            res.send(Object.assign({ emoji }, friendUser));
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: '친구 정보 조회에 실패했습니다.',
            });
            return;
        }
    }),
    list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const friends = yield services_1.FriendService.getFriends(userId);
            const friendsWithChat = yield services_1.ChatService.getRecentActivityNChat(userId, friends);
            if (friendsWithChat.length === 0) {
                res.status(404).send({ message: '채팅 중인 친구가 존재하지 않습니다.' });
                return;
            }
            res.send(friendsWithChat);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: '친구 목록 조회에 실패했습니다.',
            });
            return;
        }
    }),
    chat: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user) {
            res.status(401).send({ message: '로그인이 필요합니다.' });
            return;
        }
        const { id: roomId } = req.params;
        const messages = yield services_1.ChatService.getMessages(Number(roomId));
        if (messages.length === 0) {
            res.status(404).send({ message: '메시지가 존재하지 않습니다.' });
            return;
        }
        res.send(messages);
    }),
};
