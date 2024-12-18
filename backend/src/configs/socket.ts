import { ActivityService, ChatService, FriendService, JWTService, UserService } from '@/services'
import { Message } from '@prisma/client'
import { Server as HttpServer } from 'http'
import { Server, Socket } from 'socket.io'


interface User {
  userId: number
  socketId: string
  isOnline: boolean
  count: number
}

interface ChatRoom {
  user: [User, User],
  messages: Message[]
}

export const ChatRooms: Record<string | number, ChatRoom> = {}

export class SocketIO {
  private static instance: SocketIO
  private io: Server | null = null

  public static getInstance(): SocketIO {
    if (!SocketIO.instance) {
      SocketIO.instance = new SocketIO()
    }
    return SocketIO.instance
  }

  public init(server: HttpServer) {
    if (!this.io) {
      this.io = new Server(server, {
        cors: {
          origin: '*',
        },
      })
      console.log('Socket.IO가 초기화되었습니다.')

      this.io.on('connection', (socket: Socket) => {
        console.log(`User connected: ${socket.id}`)

        socket.on('join', async ({ JWT, roomId }: { JWT: string, roomId: number }) => {
          // JWT를 검증하여 사용자 정보를 가져온다.
          const decoded =JWTService.verifyToken(JWT, 'ACCESS')

          if (!decoded) {
            console.log('유효하지 않은 토큰입니다.')
            socket.disconnect()
            return
          }

          if (typeof decoded === 'string' || !('id' in decoded || 'name' in decoded)) {
            console.log('JWT 타입가드 에러입니다.')
            socket.disconnect()
            return
          }

          const { id, name } = decoded
          const user = await UserService.findUser({ id, username: name })

          if (!user) {
            console.log('사용자를 찾을 수 없습니다.')
            socket.disconnect()
            return
          }

          const userId = user.id

          // 사용자 정보를 통해 room id에 해당하는 자격을 검증한다.

          const isConnectionUser = await FriendService.isConnectionUser(userId, roomId)

          if (!isConnectionUser || !isConnectionUser.isConnectionUser || !isConnectionUser.user || !isConnectionUser.friend) {
            console.log('사용자의 자격이 없습니다.')
            socket.disconnect()
            return
          }

          const { user: _user, friend: _friend } = isConnectionUser
          
          if (!ChatRooms[roomId]) {
            const messages = await ChatService.getMessages(roomId)
            ChatRooms[roomId] = { user: [
              {
                userId: _user,
                socketId: socket.id,
                isOnline: true,
                count: 0,
              }, {
                userId: _friend,
                socketId: '',
                isOnline: false,
                count: 0,
              }
            ], messages }
          } else {
            const index = ChatRooms[roomId].user.findIndex((user) => user.userId === _user)
            if (index === -1) {
              console.log('방을 찾을 수 없습니다.')
              socket.disconnect()
              return
            }

            const ChatRoomUser = ChatRooms[roomId].user[index]
            ChatRoomUser.socketId = socket.id
            ChatRoomUser.isOnline = true
            ChatRoomUser.count = 0
          }

          const friendUser = await UserService.findUserById(_friend)
          if (!friendUser) {
            console.log('친구 정보를 찾을 수 없습니다.')
            socket.disconnect()
            return
          }

          const recentActivity = await ActivityService.recent(_friend)
          const emoji = recentActivity?.emoji || ''


          socket.join(roomId.toString())
          socket.emit('join', { success: true, messages: ChatRooms[roomId].messages, friend: {
            id: friendUser.id,
            username: friendUser.username,
            avatar: friendUser.avatar,
            emoji,
          }})
        })

        socket.on('message', async ({ roomId, message }: { roomId: number; message: string }) => {
          if (!ChatRooms[roomId]) {
            console.log('Room does not exist.')
            return
          }

          const user = ChatRooms[roomId].user.find((user) => user.socketId === socket.id)
          const friend = ChatRooms[roomId].user.find((user) => user.socketId !== socket.id)

          if (!user || !friend) {
            console.log('User does not exist.')
            return
          }

          // DB에 메시지를 저장한다.
          const _message = await FriendService.createMessage(user.userId, roomId,message)

          if (ChatRooms[roomId].messages) {
            ChatRooms[roomId].messages.push(_message)
          }

          if (friend.isOnline) {
            this.io?.to(friend.socketId).emit('message', { message: _message })
          } else {
            friend.count += 1
          } 

          this.io?.to(socket.id).emit('message', { message: _message })
        })

        socket.on('disconnect', () => {
          console.log('A user disconnected:', socket.id)

          // ChatRooms에서 해당 유저를 찾아 isOnline을 false로 변경한다.
          for (const key in ChatRooms) {
            const index = ChatRooms[key].user.findIndex((user) => user.socketId === socket.id)
            if (index !== -1) {
              ChatRooms[key].user[index].isOnline = false
              if (!ChatRooms[key].user.some((u) => u.isOnline)) {
                delete ChatRooms[key]
              }
              break
            }
          }
        })
      })
    }
  }

  public getIO(): Server {
    if (!this.io) {
      throw new Error('Socket.IO가 초기화되지 않았습니다! init()을 먼저 호출해주세요.')
    }
    return this.io
  }
}