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
exports.ChatService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ChatService {
    static getMessages(connectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.message.findMany({
                where: {
                    connectionId,
                },
                orderBy: {
                    createdAt: 'asc',
                }
            });
        });
    }
    static findWith(userId, connectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield prisma.connection.findFirst({
                where: {
                    id: connectionId,
                    OR: [
                        { userId },
                        { friendId: userId },
                    ],
                },
            });
            if (!connection)
                return null;
            if (connection.userId === userId) {
                return connection.friendId;
            }
            else {
                return connection.userId;
            }
        });
    }
    static find(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield prisma.connection.findFirst({
                where: {
                    OR: [
                        { userId, friendId },
                        { userId: friendId, friendId: userId },
                    ],
                },
                select: {
                    id: true,
                }
            });
            return connection;
        });
    }
    static getRecentActivityNChat(userId, friends) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Promise.all([
                ...friends.map((friendId) => __awaiter(this, void 0, void 0, function* () {
                    // 최근 활동은 없을 수 있음. null 처리
                    const recentActivity = yield prisma.activity.findFirst({
                        where: {
                            userId: friendId,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        select: {
                            emoji: true,
                        },
                    });
                    // 친구 정보는 무조건 있어야 함. 없으면 에러
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
                    const connection = yield prisma.connection.findFirst({
                        where: {
                            OR: [
                                { userId, friendId },
                                { userId: friendId, friendId: userId },
                            ],
                        },
                        select: {
                            id: true,
                        },
                    });
                    if (!connection)
                        return null;
                    const lastestMessage = yield prisma.message.findFirst({
                        where: {
                            connectionId: connection.id,
                        },
                        orderBy: {
                            createdAt: 'desc',
                        },
                        select: {
                            content: true,
                            createdAt: true,
                        },
                    });
                    return {
                        userId: friendId,
                        username: userInfo.username,
                        avatar: userInfo.avatar,
                        emoji: recentActivity === null || recentActivity === void 0 ? void 0 : recentActivity.emoji,
                        connectionId: connection.id,
                        lastestMessage: lastestMessage === null || lastestMessage === void 0 ? void 0 : lastestMessage.content,
                        updatedAt: lastestMessage === null || lastestMessage === void 0 ? void 0 : lastestMessage.createdAt,
                    };
                })),
            ]);
            return data.filter((d) => d !== null);
        });
    }
}
exports.ChatService = ChatService;
