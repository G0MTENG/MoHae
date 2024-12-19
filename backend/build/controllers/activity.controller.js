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
exports.ActivityController = void 0;
const services_1 = require("../services");
const image_1 = require("../utils/image");
exports.ActivityController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // req.user -> req.body의 데이터를 가지고 새로운 activity를 생성한다.
        // 생성된 activity를 response로 보낸다.
        try {
            const files = req.files;
            if (!req.user) {
                res.status(401).send({ message: '로그인이 필요합니다.' });
                return;
            }
            const { id: userId } = req.user;
            const { title, description, emoji } = req.body;
            const recentActivity = yield services_1.ActivityService.recentId(userId);
            if (recentActivity) {
                yield services_1.ActivityService.updateEndAt(recentActivity.id, new Date());
            }
            const createActivity = yield services_1.ActivityService.create({
                title,
                description,
                emoji,
                userId,
                images: files,
            });
            res.send(createActivity);
            return;
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ message: '에러가 발생했습니다.' });
            return;
        }
    }),
    recent: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user) {
            res.status(401).send({ message: '로그인이 필요합니다.' });
            return;
        }
        const recentActivity = yield services_1.ActivityService.recent(user.id);
        if (!recentActivity) {
            res.status(204).send({ message: '활동이 없습니다.' });
            return;
        }
        res.send(recentActivity);
        return;
    }),
    list: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // query string으로 날짜를 받아서, 해당 날짜에 생성된 activity들을 찾아서 response로 보낸다. (페이지네이션 적용 X)
        const user = req.user;
        if (!user) {
            res.status(401).send({ message: '로그인이 필요합니다.' });
            return;
        }
        const date = req.query.date;
        const listActivity = yield services_1.ActivityService.list(user.id, date);
        res.send(listActivity);
        return;
    }),
    detail: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // req.params.id로 특정 activity를 찾아서 response로 보낸다.
        // 자신 / 친구를 제외한 사용자가 요청했을 때 잘못된 요청이므로 403 (forbidden) 에러를 던진다. -> 이건 친구 기능을 개발한 후 추가
        if (!req.user) {
            res.status(401).send({ message: '로그인이 필요합니다.' });
            return;
        }
        const activityId = Number(req.params.id);
        const detailActivity = yield services_1.ActivityService.detail(activityId);
        if (!detailActivity) {
            res.status(404).send({ message: '활동이 존재하지 않습니다.' });
            return;
        }
        const userInfo = yield services_1.UserService.info(detailActivity.userId);
        if (!userInfo) {
            res.status(404).send({ message: '유저가 존재하지 않습니다.' });
            return;
        }
        const userId = req.user.id;
        const friendId = detailActivity.userId;
        const isFriend = yield services_1.FriendService.isFriend(userId, friendId);
        const chat = yield services_1.ChatService.find(userId, friendId);
        if (!isFriend && userId !== friendId) {
            res.status(403).send({ message: '권한이 없습니다.' });
            return;
        }
        res.send({
            activity: detailActivity,
            owner: req.user.id === detailActivity.userId,
            user: {
                username: userInfo.username,
                avatar: userInfo.avatar,
            },
            connectionId: chat === null || chat === void 0 ? void 0 : chat.id,
        });
        return;
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // req.params.id로 특정 activity를 찾아서 삭제한다.
        // 삭제된 activity를 response로 보낸다.
        const activityId = Number(req.params.id);
        const deleteActivity = yield services_1.ActivityService.delete(activityId);
        if (!deleteActivity) {
            res.status(404).send({ message: '존재하지 않습니다.' });
            return;
        }
        res.send(deleteActivity);
        return;
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // req.params.id로 특정 activity를 찾아서 req.body의 데이터로 업데이트한다.
        // 업데이트된 activity를 response로 보낸다.
        const activityId = Number(req.params.id);
        const files = req.files;
        const { title, description, emoji } = req.body;
        let urls = [];
        if (req.body.urls && typeof req.body.urls === 'string') {
            urls = JSON.parse(req.body.urls);
        }
        if (urls.length + files.length > 4) {
            res.status(400).send({ message: '이미지는 3개까지 저장이 가능합니다.' });
            return;
        }
        const images = (files && files.map((file) => (0, image_1.parseImageUrl)(file))) || [];
        images.concat(urls);
        if (!req.user) {
            res.status(401).send({ message: '로그인이 필요합니다.' });
            return;
        }
        const activity = yield services_1.ActivityService.exist(activityId);
        if (!activity) {
            res.status(404).send({ message: '존재하지 않습니다.' });
            return;
        }
        if (activity.userId !== req.user.id) {
            res.status(403).send({ message: '권한이 없습니다.' });
            return;
        }
        const updateActivity = yield services_1.ActivityService.update(activityId, {
            title,
            description,
            emoji,
            images,
        });
        res.send(updateActivity);
        return;
    }),
};
