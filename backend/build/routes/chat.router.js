"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = void 0;
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .get('/', controllers_1.ChatController.list) // 채팅방 목록 조회
    .get('/:id', controllers_1.ChatController.chat) // 웹소켓 연결 (채팅방 입장)
    .get('/with/:id', controllers_1.ChatController.with); // 채팅 상대 정보 조회
exports.chatRouter = router;
