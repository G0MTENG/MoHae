import { UserService } from "@/services";
import { Request, Response } from "express";

export const UserController = {
  user: async (req: Request, res: Response) => {
    try {
      const user = req.user
  
      if (!user) {
        throw new Error('유저를 찾을 수 없습니다.')
      }

      const userId = user.id
      const userInfo = await UserService.info(userId)

      if (!userInfo) {
        throw new Error('유저 정보를 찾을 수 없습니다.')
      }

      res.send(userInfo)
    } catch (error) {
      console.error(error)
      res.status(500).send('에러가 발생했습니다.')
    }
  }
}