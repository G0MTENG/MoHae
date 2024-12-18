import { ChatRooms } from '@/configs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class ChatService {
  static async getMessages(connectionId: number) {
    return await prisma.message.findMany({
      where: {
        connectionId,
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
  }

  static async findWith(userId: number, connectionId: number) {
    const connection = await prisma.connection.findFirst({
      where: {
        id: connectionId,
        OR: [
          { userId },
          { friendId: userId },
        ],
      },
    })

    if (!connection) return null
    if (connection.userId === userId) {
      return connection.friendId
    } else {
      return connection.userId
    }
  }
  static async find(userId: number, friendId: number) {
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
      select: {
        id: true,
      }
    })

    return connection
  }

  static async getRecentActivityNChat(userId: number, friends: number[]) {
    const data = await Promise.all([
      ...friends.map(async (friendId) => {
        // 최근 활동은 없을 수 있음. null 처리
        const recentActivity = await prisma.activity.findFirst({
          where: {
            userId: friendId,
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            emoji: true,
          },
        })

        // 친구 정보는 무조건 있어야 함. 없으면 에러
        const userInfo = await prisma.user.findFirst({
          where: {
            id: friendId,
          },
          select: {
            username: true,
            avatar: true,
          },
        })

        if (!userInfo) return null

        const connection = await prisma.connection.findFirst({
          where: {
            OR: [
              { userId, friendId },
              { userId: friendId, friendId: userId },
            ],
          },
          select: {
            id: true,
          },
        })

        if (!connection) return null

        const lastestMessage = await prisma.message.findFirst({
          where: {
            connectionId: connection.id,
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            content: true,
            createdAt: true,
          },
        })

        return {
          userId: friendId,
          username: userInfo.username,
          avatar: userInfo.avatar,
          emoji: recentActivity?.emoji,
          connectionId: connection.id,
          lastestMessage: lastestMessage?.content,
          updatedAt: lastestMessage?.createdAt,
        }
      }),
    ])

    return data.filter((d) => d !== null)
  }
}
