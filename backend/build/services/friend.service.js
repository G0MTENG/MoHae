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
exports.FriendService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class FriendService {
    static createMessage(userId, roomId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.create({
                data: {
                    userId,
                    connectionId: roomId,
                    content: message,
                },
            });
        });
    }
    static isFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return ((yield prisma.connection.findFirst({
                where: {
                    OR: [
                        { userId, friendId },
                        { userId: friendId, friendId: userId },
                    ],
                },
            })) !== null);
        });
    }
    static getFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connections = yield prisma.connection.findMany({
                where: {
                    OR: [{ userId }, { friendId: userId }],
                },
                select: {
                    userId: true,
                    friendId: true,
                },
            });
            return connections.map((connection) => connection.userId === userId ? connection.friendId : connection.userId);
        });
    }
    static addFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.connection.create({
                data: {
                    userId,
                    friendId,
                },
            });
        });
    }
    static deleteFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.connection.deleteMany({
                where: {
                    OR: [
                        { userId, friendId },
                        { userId: friendId, friendId: userId },
                    ],
                },
            });
        });
    }
    static getActivities(friendsIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const activities = yield Promise.all([
                ...friendsIds.map((friendId) => __awaiter(this, void 0, void 0, function* () {
                    const recentActivity = yield prisma.activity.findFirst({
                        where: {
                            userId: friendId,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        select: {
                            id: true,
                            title: true,
                            emoji: true,
                        },
                    });
                    if (!recentActivity)
                        return null;
                    const userInfo = yield prisma.user.findFirst({
                        where: {
                            id: friendId,
                        },
                        select: {
                            username: true,
                            avatar: true,
                        },
                    });
                    if (!userInfo)
                        return null;
                    return {
                        activity: recentActivity,
                        user: {
                            id: friendId,
                            username: userInfo.username,
                            avatar: userInfo.avatar,
                        },
                    };
                })),
            ]);
            return activities.filter((activity) => activity !== null);
        });
    }
    static find(friendCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: {
                    randomCode: friendCode,
                },
            });
        });
    }
    static isConnectionUser(userId, roomId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield prisma.connection.findFirst({
                where: {
                    id: roomId,
                },
            });
            // 연결이 존재하지 않는 경우
            if (!connection) {
                return {
                    user: null,
                    friend: null,
                    isConnectionUser: false,
                };
            }
            // 현재 사용자가 user인지 friend인지 확인
            const isUser = connection.userId === userId;
            const isFriend = connection.friendId === userId;
            return {
                user: isUser ? connection.userId : connection.friendId, // 현재 사용자의 ID
                friend: isUser ? connection.friendId : connection.userId, // 상대방 ID
                isConnectionUser: isUser || isFriend, // 현재 사용자가 이 Connection에 속하는지
            };
        });
    }
    static isExistConnection(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield prisma.connection.findFirst({
                where: {
                    OR: [
                        { userId, friendId },
                        { userId: friendId, friendId: userId },
                    ],
                },
            });
            return connection !== null;
        });
    }
}
exports.FriendService = FriendService;
