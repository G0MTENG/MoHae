"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityRouter = void 0;
const multer_1 = require("../configs/multer");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const validators_1 = require("../validators");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router
    .post('/', multer_1.upload.array('images', 3), (0, middlewares_1.validate)(validators_1.ActivityValidator.form), controllers_1.ActivityController.create)
    .put('/:id', multer_1.upload.array('images', 3), (0, middlewares_1.validate)(validators_1.ActivityValidator.form), controllers_1.ActivityController.update)
    .delete('/:id', controllers_1.ActivityController.delete)
    .get('/recent', controllers_1.ActivityController.recent)
    .get('/', controllers_1.ActivityController.list)
    .get('/:id', controllers_1.ActivityController.detail);
exports.activityRouter = router;
