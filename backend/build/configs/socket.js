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
exports.SocketIO = exports.ChatRooms = void 0;
const services_1 = require("../services");
const socket_io_1 = require("socket.io");
exports.ChatRooms = {};
class SocketIO {
    constructor() {
        this.io = null;
    }
    static getInstance() {
        if (!SocketIO.instance) {
            SocketIO.instance = new SocketIO();
        }
        return SocketIO.instance;
    }
    init(server) {
        if (!this.io) {
            this.io = new socket_io_1.Server(server, {
                cors: {
                    origin: '*',
                },
            });
            console.log('Socket.IO가 초기화되었습니다.');
            this.io.on('connection', (socket) => {
                console.log(`User connected: ${socket.id}`);
                socket.on('join', (_a) => __awaiter(this, [_a], void 0, function* ({ JWT, roomId }) {
                    // JWT를 검증하여 사용자 정보를 가져온다.
                    const decoded = services_1.JWTService.verifyToken(JWT, 'ACCESS');
                    if (!decoded) {
                        console.log('유효하지 않은 토큰입니다.');
                        socket.disconnect();
                        return;
                    }
                    if (typeof decoded === 'string' || !('id' in decoded || 'name' in decoded)) {
                        console.log('JWT 타입가드 에러입니다.');
                        socket.disconnect();
                        return;
                    }
                    const { id, name } = decoded;
                    const user = yield services_1.UserService.findUser({ id, username: name });
                    if (!user) {
                        console.log('사용자를 찾을 수 없습니다.');
                        socket.disconnect();
                        return;
                    }
                    const userId = user.id;
                    // 사용자 정보를 통해 room id에 해당하는 자격을 검증한다.
                    const isConnectionUser = yield services_1.FriendService.isConnectionUser(userId, roomId);
                    if (!isConnectionUser || !isConnectionUser.isConnectionUser || !isConnectionUser.user || !isConnectionUser.friend) {
                        console.log('사용자의 자격이 없습니다.');
                        socket.disconnect();
                        return;
                    }
                    const { user: _user, friend: _friend } = isConnectionUser;
                    if (!exports.ChatRooms[roomId]) {
                        const messages = yield services_1.ChatService.getMessages(roomId);
                        exports.ChatRooms[roomId] = { user: [
                                {
                                    userId: _user,
                                    socketId: socket.id,
                                    isOnline: true,
                                    count: 0,
                                }, {
                                    userId: _friend,
                                    socketId: '',
                                    isOnline: false,
                                    count: 0,
                                }
                            ], messages };
                    }
                    else {
                        const index = exports.ChatRooms[roomId].user.findIndex((user) => user.userId === _user);
                        if (index === -1) {
                            console.log('방을 찾을 수 없습니다.');
                            socket.disconnect();
                            return;
                        }
                        const ChatRoomUser = exports.ChatRooms[roomId].user[index];
                        ChatRoomUser.socketId = socket.id;
                        ChatRoomUser.isOnline = true;
                        ChatRoomUser.count = 0;
                    }
                    const friendUser = yield services_1.UserService.findUserById(_friend);
                    if (!friendUser) {
                        console.log('친구 정보를 찾을 수 없습니다.');
                        socket.disconnect();
                        return;
                    }
                    const recentActivity = yield services_1.ActivityService.recent(_friend);
                    const emoji = (recentActivity === null || recentActivity === void 0 ? void 0 : recentActivity.emoji) || '';
                    socket.join(roomId.toString());
                    socket.emit('join', { success: true, messages: exports.ChatRooms[roomId].messages, friend: {
                            id: friendUser.id,
                            username: friendUser.username,
                            avatar: friendUser.avatar,
                            emoji,
                        } });
                }));
                socket.on('message', (_a) => __awaiter(this, [_a], void 0, function* ({ roomId, message }) {
                    var _b, _c;
                    if (!exports.ChatRooms[roomId]) {
                        console.log('Room does not exist.');
                        return;
                    }
                    const user = exports.ChatRooms[roomId].user.find((user) => user.socketId === socket.id);
                    const friend = exports.ChatRooms[roomId].user.find((user) => user.socketId !== socket.id);
                    if (!user || !friend) {
                        console.log('User does not exist.');
                        return;
                    }
                    // DB에 메시지를 저장한다.
                    const _message = yield services_1.FriendService.createMessage(user.userId, roomId, message);
                    if (exports.ChatRooms[roomId].messages) {
                        exports.ChatRooms[roomId].messages.push(_message);
                    }
                    if (friend.isOnline) {
                        (_b = this.io) === null || _b === void 0 ? void 0 : _b.to(friend.socketId).emit('message', { message: _message });
                    }
                    else {
                        friend.count += 1;
                    }
                    (_c = this.io) === null || _c === void 0 ? void 0 : _c.to(socket.id).emit('message', { message: _message });
                }));
                socket.on('disconnect', () => {
                    console.log('A user disconnected:', socket.id);
                    // ChatRooms에서 해당 유저를 찾아 isOnline을 false로 변경한다.
                    for (const key in exports.ChatRooms) {
                        const index = exports.ChatRooms[key].user.findIndex((user) => user.socketId === socket.id);
                        if (index !== -1) {
                            exports.ChatRooms[key].user[index].isOnline = false;
                            if (!exports.ChatRooms[key].user.some((u) => u.isOnline)) {
                                delete exports.ChatRooms[key];
                            }
                            break;
                        }
                    }
                });
            });
        }
    }
    getIO() {
        if (!this.io) {
            throw new Error('Socket.IO가 초기화되지 않았습니다! init()을 먼저 호출해주세요.');
        }
        return this.io;
    }
}
exports.SocketIO = SocketIO;
