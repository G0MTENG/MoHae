import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class FriendService {
  static async getFriends(userId: number) {
    return await prisma.connection.findMany({
      where: {
        userId
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    })
  }

  static async addFriend(userId: number, friendId: number) {
    return await prisma.$transaction([
      prisma.connection.create({
        data: {
          userId,
          friendId
        }
      }),
      prisma.connection.create({
        data: {
          userId: friendId,
          friendId: userId
        }
      })
    ])
  }

  static async deleteFriend(userId: number, friendId: number) {
    return await prisma.$transaction([
      prisma.connection.deleteMany({
        where: {
          userId,
          friendId
        }
      }),
      prisma.connection.deleteMany({
        where: {
          userId: friendId,
          friendId: userId
        }
      })
    ])
  }

  static async getActivities(userId: number) {
    // userId의 친구들의 최근 활동을 가져옴
    // 1. userId의 친구 목록을 가져온다.
    // 2. 친구 목록의 userId를 이용해 최근 활동을 가져온다.
    // 3. 최근 활동을 반환한다.
    
    const friendsQuery = await prisma.connection.findMany({
      where: {
        userId
      },
      select: {
        user: {
          select: {
            id: true,
            username: true,
            avatar: true
          }
        }
      }
    })

    const friends = friendsQuery.map(friend => ({ id: friend.user.id, username: friend.user.username }))
    
    const activities = await Promise.all([...friends.map(async ({ id, username }) => {
      const recentActivity = await prisma.activity.findFirst({
        where: {
          userId: id
        },
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          title: true,
          emoji: true,
        }
      })

      if (!recentActivity) return null

      return {
        username,
        userId: id,
        ...recentActivity,
      }
    }).filter(Boolean)])

    return activities
  }

  static async find (friendCode: string) {
    return await prisma.user.findFirst({
      where: {
        randomCode: friendCode
      },
    })
  }
  
  static async isExistConnection (userId: number, friendId: number) {
    const connection = await prisma.connection.findFirst({
      where: {
        userId,
        friendId
      }
    })

    return connection !== null
  }
}