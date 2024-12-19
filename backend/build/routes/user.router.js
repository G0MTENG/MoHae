"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const multer_1 = require("../configs/multer");
const user_controller_1 = require("../controllers/user.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .get('/user', user_controller_1.UserController.user)
    .put('/profile', multer_1.upload.single('avatar'), user_controller_1.UserController.updateProfile);
exports.userRouter = router;
