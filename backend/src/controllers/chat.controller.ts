import { ActivityService, ChatService, FriendService, UserService } from '@/services'
import { Request, Response } from 'express'

export const ChatController = {
  with: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return
      }

      const { id: userId } = req.user
      const roomdId = Number(req.params.id)

      const friendId = await ChatService.findWith(userId, roomdId)
      if(!friendId) {
        res.status(404).send({ message: '친구 정보가 존재하지 않습니다.' })
        return
      }

      const friendUser = await UserService.findUserById(friendId)
      const recentActivity = await ActivityService.recent(friendId)
      const emoji = recentActivity?.emoji || ''

      if (!friendUser) {
        res.status(404).send({ message: '친구 정보가 존재하지 않습니다.' })
        return
      }

      res.send({
        emoji,
        ...friendUser,
      })
      return
    } catch (error) {
      console.error(error)

      res.status(500).json({
        message: '친구 정보 조회에 실패했습니다.',
      })

      return
    }
  },
  list: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return
      }

      const { id: userId } = req.user
      const friends = await FriendService.getFriends(userId)
      const friendsWithChat = await ChatService.getRecentActivityNChat(userId, friends)

      if (friendsWithChat.length === 0) {
        res.status(404).send({ message: '채팅 중인 친구가 존재하지 않습니다.' })
        return
      }

      res.send(friendsWithChat)
    } catch (error) {
      console.error(error)

      res.status(500).json({
        message: '친구 목록 조회에 실패했습니다.',
      })

      return
    }
  },
  chat: async (req: Request, res: Response) => {
    const user = req.user

    if (!user) {
      res.status(401).send({ message: '로그인이 필요합니다.' })
      return
    }

    const { id: roomId } = req.params
    
    const messages = await ChatService.getMessages(Number(roomId))

    if (messages.length === 0) {
      res.status(404).send({ message: '메시지가 존재하지 않습니다.' })
      return
    }

    res.send(messages)
  },
}
