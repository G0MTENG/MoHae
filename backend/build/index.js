"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const configs_1 = require("./configs");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const http_1 = __importDefault(require("http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// 보안 및 기본 설정
app.use((0, morgan_1.default)('combined'));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use((0, cors_1.default)(configs_1.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// 정적 파일 제공 (React 빌드 결과 & Multer 업로드 파일)
app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
// API 라우트 설정
app.use('/api', routes_1.authRouter);
app.use('/api', routes_1.jwtRouter);
app.use('/api', routes_1.userRouter);
app.use('/api/chat', routes_1.chatRouter);
app.use('/api/activity', routes_1.activityRouter);
app.use('/api/friend', routes_1.friendRouter);
// 에러 핸들러
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Socket.IO 초기화
configs_1.SocketIO.getInstance().init(server);
// 서버 실행
server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
