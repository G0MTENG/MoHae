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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityService = void 0;
const image_1 = require("../utils/image");
const client_1 = require("@prisma/client");
const dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/ko");
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.locale('ko');
const KST = 'Asia/Seoul';
const prisma = new client_1.PrismaClient();
class ActivityService {
    static create(_a) {
        return __awaiter(this, arguments, void 0, function* ({ title, description, emoji, userId, images, }) {
            return yield prisma.activity.create({
                data: {
                    title,
                    description,
                    emoji,
                    userId,
                    images: images && {
                        create: images.map((image, index) => ({
                            imageUrl: (0, image_1.parseImageUrl)(image),
                            order: index,
                        })),
                    },
                },
                include: { images: true },
            });
        });
    }
    static recentId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.activity.findFirst({
                where: {
                    userId: id,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                select: { id: true },
            });
        });
    }
    static recent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.activity.findFirst({
                where: {
                    userId: id,
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: { images: true },
            });
        });
    }
    static list(userId, date) {
        return __awaiter(this, void 0, void 0, function* () {
            // 한국 시간 기준 하루의 시작과 끝
            const startOfDay = dayjs_1.default.tz(`${date}T00:00:00`, KST).utc().toDate();
            const endOfDay = dayjs_1.default.tz(`${date}T23:59:59.999`, KST).utc().toDate();
            return yield prisma.activity.findMany({
                where: {
                    userId,
                    createdAt: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                include: { images: true },
            });
        });
    }
    static detail(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.activity.findUnique({
                where: {
                    id,
                },
                include: { images: true },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.activity.delete({
                where: {
                    id,
                },
            });
        });
    }
    static update(id_1, _a) {
        return __awaiter(this, arguments, void 0, function* (id, { title, description, emoji, images }) {
            return yield prisma.activity.update({
                where: {
                    id,
                },
                data: {
                    title,
                    description,
                    emoji,
                    images: images && {
                        deleteMany: {},
                        create: images.map((image, index) => ({
                            imageUrl: image,
                            order: index,
                        })),
                    },
                },
                include: { images: true },
            });
        });
    }
    static exist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.activity.findUnique({
                select: { id: true, userId: true },
                where: {
                    id,
                },
            });
        });
    }
    static updateEndAt(id, endAt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.activity.update({
                where: {
                    id,
                },
                data: {
                    endAt,
                },
            });
        });
    }
}
exports.ActivityService = ActivityService;
