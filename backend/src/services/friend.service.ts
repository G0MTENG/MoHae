import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class FriendService {
  static async createMessage(userId: number, roomId: number,message: string) {
    return await prisma.message.create({
      data: {
        userId,
        connectionId: roomId,
        content: message,
      },
    })
  }

  static async isFriend(userId: number, friendId: number) {
    return (
      (await prisma.connection.findFirst({
        where: {
          OR: [
            { userId, friendId },
            { userId: friendId, friendId: userId },
          ],
        },
      })) !== null
    )
  }

  static async getFriends(userId: number) {
    const connections = await prisma.connection.findMany({
      where: {
        OR: [{ userId }, { friendId: userId }],
      },
      select: {
        userId: true,
        friendId: true,
      },
    })

    return connections.map((connection) =>
      connection.userId === userId ? connection.friendId : connection.userId,
    )
  }

  static async addFriend(userId: number, friendId: number) {
    return await prisma.connection.create({
      data: {
        userId,
        friendId,
      },
    })
  }

  static async deleteFriend(userId: number, friendId: number) {
    return await prisma.connection.deleteMany({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    })
  }

  static async getActivities(friendsIds: number[]) {
    const activities = await Promise.all([
      ...friendsIds.map(async (friendId) => {
        const recentActivity = await prisma.activity.findFirst({
          where: {
            userId: friendId,
          },
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            title: true,
            emoji: true,
          },
        })

        if (!recentActivity) return null

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

        return {
          activity: recentActivity,
          user: {
            id: friendId,
            username: userInfo.username,
            avatar: userInfo.avatar,
          },
        }
      }),
    ])

    return activities.filter((activity) => activity !== null)
  }

  static async find(friendCode: string) {
    return await prisma.user.findFirst({
      where: {
        randomCode: friendCode,
      },
    })
  }

  static async isConnectionUser(userId: number, roomId: number) {
    const connection = await prisma.connection.findFirst({
      where: {
        id: roomId,
      },
    });
  
    // 연결이 존재하지 않는 경우
    if (!connection) {
      return {
        user: null,
        friend: null,
        isConnectionUser: false,
      };
    }
  
    // 현재 사용자가 user인지 friend인지 확인
    const isUser = connection.userId === userId;
    const isFriend = connection.friendId === userId;
  
    return {
      user: isUser ? connection.userId : connection.friendId, // 현재 사용자의 ID
      friend: isUser ? connection.friendId : connection.userId, // 상대방 ID
      isConnectionUser: isUser || isFriend, // 현재 사용자가 이 Connection에 속하는지
    };
  }

  static async isExistConnection(userId: number, friendId: number) {
    const connection = await prisma.connection.findFirst({
      where: {
        OR: [
          { userId, friendId },
          { userId: friendId, friendId: userId },
        ],
      },
    })

    return connection !== null
  }
}
