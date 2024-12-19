"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtRouter = void 0;
const jwt_controller_1 = require("../controllers/jwt.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/refresh', jwt_controller_1.JWTController.refresh).use(jwt_controller_1.JWTController.access);
exports.jwtRouter = router;
