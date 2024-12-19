"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRouter = void 0;
const controllers_1 = require("../controllers");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .get('/activity', controllers_1.FriendController.activity)
    .get('/', controllers_1.FriendController.friends)
    .post('/', controllers_1.FriendController.addFriend)
    .delete('/:id', controllers_1.FriendController.deleteFriend);
exports.friendRouter = router;
