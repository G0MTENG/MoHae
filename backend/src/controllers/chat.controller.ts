import { ChatService, FriendService } from '@/services'
import { Request, Response } from 'express'

export const ChatController = {
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
    // 웹소켓 -> 채팅방 입장
  },
}
