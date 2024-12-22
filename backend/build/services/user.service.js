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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const utils_1 = require("../utils");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    static users(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all(ids.map((id) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.findUnique({
                    where: {
                        id,
                    },
                    select: {
                        id: true,
                        username: true,
                        avatar: true,
                    },
                });
            })));
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.update({
                where: {
                    id,
                },
                data,
            });
        });
    }
    static info(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                    randomCode: true,
                },
            });
        });
    }
    static signUp(_a) {
        return __awaiter(this, arguments, void 0, function* ({ username, email, password, }) {
            return yield prisma.user.create({
                data: {
                    username,
                    email,
                    password,
                    randomCode: (0, utils_1.makeRandomCode)(),
                },
            });
        });
    }
    static isDuplicateEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
            return user !== null;
        });
    }
    static deleteAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma.user.deleteMany();
        });
    }
    static findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: {
                    email,
                },
            });
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    username: true,
                    avatar: true,
                }
            });
        });
    }
    static findUser(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma.user.findFirst({
                where: {
                    AND: [{ id: filter.id }, { username: filter.username }],
                },
            });
        });
    }
}
exports.UserService = UserService;
