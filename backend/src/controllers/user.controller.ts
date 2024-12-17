import { parseImageUrl } from '@/utils/image'
import { UserService } from '@/services'
import { Request, Response } from 'express'

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
  },
  updateProfile: async (req: Request, res: Response) => {
    try {
      const avatar = req.file
      const username = req.body.username

      if (!username) {
        res.status(400).send('username이 필요합니다.')
        return
      }

      const user = req.user
      if (!user) {
        res.status(401).send('로그인이 필요합니다.')
        return
      }

      if (avatar) {
        await UserService.update(user.id, { username, avatar: parseImageUrl(avatar) })
      } else {
        await UserService.update(user.id, { username })
      }

      res.send({
        message: '프로필이 업데이트 되었습니다.',
      })
      return
    } catch (error) {
      console.error(error)
      res.status(500).send('에러가 발생했습니다.')
    }
  },
}
