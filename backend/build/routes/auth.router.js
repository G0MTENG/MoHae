"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router
    .post('/sign-in', (0, middlewares_1.validate)(validators_1.AuthValidator.signIn), controllers_1.AuthController.signIn)
    .post('/sign-up', (0, middlewares_1.validate)(validators_1.AuthValidator.signUp), controllers_1.AuthController.signUp);
exports.authRouter = router;
