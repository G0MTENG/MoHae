import { ChatController } from '@/controllers'
import Express from 'express'

const router = Express.Router()

router
  .get('/', ChatController.list) // 채팅방 목록 조회
  .get('/:id', ChatController.chat) // 웹소켓 연결 (채팅방 입장)
  .get('/with/:id', ChatController.with) // 채팅 상대 정보 조회

export const chatRouter = router
