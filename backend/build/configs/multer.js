"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const uploadDir = path_1.default.join(__dirname, '../public/uploads'); // 절대 경로 설정
if (!fs_1.default.existsSync(uploadDir)) {
    fs_1.default.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        crypto_1.default.randomBytes(16, (err, buf) => {
            if (err) {
                return cb(err, '');
            }
            const ext = path_1.default.extname(file.originalname);
            cb(null, `${buf.toString('hex')}${ext}`);
        });
    },
});
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB 제한
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
});
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|svg/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('Error: Images Only!'));
    }
}
