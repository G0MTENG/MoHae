import helmet from 'helmet';
import cors from 'cors';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { corsOptions, SocketIO } from '@/configs';
import dotenv from 'dotenv';
import path from 'path';
import {
  authRouter,
  jwtRouter,
  activityRouter,
  userRouter,
  friendRouter,
  chatRouter,
} from '@/routes';
import http from 'http';
import fs from 'fs';

dotenv.config();

const app = express();
const server = http.createServer(app);

// 보안 및 기본 설정
app.use(morgan('combined'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 정적 파일 제공 (React 빌드 결과 & Multer 업로드 파일)
app.use('/public', express.static(path.join(__dirname, 'public')));

// API 라우트 설정
app.use('/api/auth', authRouter);
app.use('/api/jwt', jwtRouter);
app.use('/api/chat', chatRouter);
app.use('/api/activity', activityRouter);
app.use('/api/friend', friendRouter);
app.use('/api/user', userRouter);

// 에러 핸들러
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Socket.IO 초기화
SocketIO.getInstance().init(server);

// 서버 실행
server.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});