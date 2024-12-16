import { ActivityService, ActivityWithImages, FriendService, UserService } from "@/services"
import { Request, Response } from "express";

export const ActivityController = {
  create: async (req: Request, res: Response) => {
    // req.user -> req.body의 데이터를 가지고 새로운 activity를 생성한다.
    // 생성된 activity를 response로 보낸다.
    try {
      const files = req.files as Express.Multer.File[]
  
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return ;
      }

      const { id: userId } = req.user
      const { title, description, emoji } = req.body

      const recentActivity = await ActivityService.recentId(userId)
      if (recentActivity) {
        await ActivityService.updateEndAt(recentActivity.id, new Date())
      }
  
      const createActivity = await ActivityService.create({
        title,
        description,
        emoji,
        userId,
        images: files
      } as ActivityWithImages)

      res.send(createActivity)
      return ;
    } catch (error) {
      console.error(error)
      res.status(500).send({ message: '에러가 발생했습니다.' })
      return ;
    }
  },
  recent: async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      res.status(401).send({ message: '로그인이 필요합니다.' })
      return ;
    }

    const recentActivity = await ActivityService.recent(user.id)

    if (!recentActivity) {
      res.status(204).send({ message: '활동이 없습니다.' })
      return ;
    }

    res.send(recentActivity)
    return ;
  },
  list: async (req: Request, res: Response) => {
    // query string으로 날짜를 받아서, 해당 날짜에 생성된 activity들을 찾아서 response로 보낸다. (페이지네이션 적용 X)
    const user = req.user
    if (!user) {
      res.status(401).send({ message: '로그인이 필요합니다.' })
      return ;
    }

    const date = req.query.date as string
    const listActivity = await ActivityService.list(user.id, date)
    res.send(listActivity)
    return ;
  },
  detail: async (req: Request, res: Response) => {
    // req.params.id로 특정 activity를 찾아서 response로 보낸다.
    // 자신 / 친구를 제외한 사용자가 요청했을 때 잘못된 요청이므로 403 (forbidden) 에러를 던진다. -> 이건 친구 기능을 개발한 후 추가
    if (!req.user) {
      res.status(401).send({ message: '로그인이 필요합니다.' })
      return ;
    }

    const activityId = Number(req.params.id)
    const detailActivity = await ActivityService.detail(activityId)
    
    if (!detailActivity) {
      res.status(404).send({ message: '활동이 존재하지 않습니다.' })
      return ;
    }
    
    const userInfo = await UserService.info(detailActivity.userId)

    if (!userInfo) {
      res.status(404).send({ message: '유저가 존재하지 않습니다.' })
      return ;
    }

    const userId = req.user.id
    const friendId = detailActivity.userId
    const isFriend = await FriendService.isFriend(userId, friendId)

    if (!isFriend && userId !== friendId) {
      res.status(403).send({ message: '권한이 없습니다.' })
      return ;
    }

    res.send({
      activity: detailActivity,
      owner: req.user.id === detailActivity.userId,
      user: {
        username: userInfo.username,
        avatar: userInfo.avatar
      }
    })
    return
  },
  delete: async (req: Request, res: Response) => {
    // req.params.id로 특정 activity를 찾아서 삭제한다.
    // 삭제된 activity를 response로 보낸다.
    const activityId = Number(req.params.id)
    console.log(activityId)
    const deleteActivity = await ActivityService.delete(activityId)

    if (!deleteActivity) {
      res.status(404).send({ message: '존재하지 않습니다.' })
      return ;
    }

    res.send(deleteActivity)
    return ;
  },
  update: async (req: Request, res: Response) => {
    // req.params.id로 특정 activity를 찾아서 req.body의 데이터로 업데이트한다.
    // 업데이트된 activity를 response로 보낸다.
    const activityId = Number(req.params.id)
    const files = req.files as Express.Multer.File[]
    const { title, description, emoji } = req.body

    if (!req.user) {
      res.status(401).send({ message: '로그인이 필요합니다.' })
      return ;
    }

    const activity = await ActivityService.exist(activityId)

    if (!activity) {
      res.status(404).send({ message: '존재하지 않습니다.' })
      return ;
    }

    if (activity.userId !== req.user.id) {
      res.status(403).send({ message: '권한이 없습니다.' })
      return ;
    }

    const updateActivity = await ActivityService.update(activityId, {
      title,
      description,
      emoji,
      images: files
    } as ActivityWithImages)

    res.send(updateActivity)
    return
  }
}