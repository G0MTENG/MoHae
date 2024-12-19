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
exports.FriendController = void 0;
const services_1 = require("../services");
exports.FriendController = {
    friends: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const friends = yield services_1.FriendService.getFriends(userId);
            const friendsInfo = yield services_1.UserService.users(friends);
            res.send({ friends: friendsInfo });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: '친구 조회에 실패했습니다.',
            });
            return;
        }
    }),
    deleteFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const { id: friendId } = req.params;
            yield services_1.FriendService.deleteFriend(userId, Number(friendId));
            res.send({ message: '친구 삭제에 성공했습니다.' });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: '친구 삭제에 실패했습니다.',
            });
            return;
        }
    }),
    activity: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const friends = yield services_1.FriendService.getFriends(userId);
            const activities = yield services_1.FriendService.getActivities(friends);
            if (activities.length === 0) {
                res.status(404).send({ message: '활동 중인 친구가 존재하지 않습니다.' });
                return;
            }
            res.send(activities);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: '활동 조회에 실패했습니다.',
            });
            return;
        }
    }),
    addFriend: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const { friendCode } = req.body;
            const friend = yield services_1.FriendService.find(friendCode);
            if (!friend) {
                res.status(404).json({
                    message: '친구를 찾을 수 없습니다.',
                });
                return;
            }
            const friendId = friend.id;
            if (userId === friendId) {
                res.status(400).json({
                    message: '자기 자신을 친구로 추가할 수 없습니다.',
                });
                return;
            }
            const isExistConnection = yield services_1.FriendService.isExistConnection(userId, friendId);
            if (isExistConnection) {
                res.status(409).json({
                    message: '이미 친구 추가된 사용자입니다.',
                });
                return;
            }
            yield services_1.FriendService.addFriend(userId, friendId);
            res.send({ message: '친구 추가에 성공했습니다.' });
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                message: '친구 추가에 실패했습니다.',
            });
            return;
        }
    }),
};
