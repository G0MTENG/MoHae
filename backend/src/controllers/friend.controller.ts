import { FriendService, UserService } from "@/services";
import { Request, Response } from "express";

export const FriendController = {
  friends: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return ;
      }

      const { id: userId } = req.user;
      const friends = await FriendService.getFriends(userId);
      const friendsInfo = await UserService.users(friends.map(friend => (friend.friendId)))
      res.send({ friends: friendsInfo });
      return
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: '친구 조회에 실패했습니다.'
      });

      return
    }
  },
  deleteFriend: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return ;
      }

      const { id: userId } = req.user;
      const { id: friendId } = req.params;
      await FriendService.deleteFriend(userId, Number(friendId));
      res.send({ message: '친구 삭제에 성공했습니다.' });
      return
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: '친구 삭제에 실패했습니다.'
      });

      return
    }
  },
  activity: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return ;
      }

      const { id: userId } = req.user;
      const friends = await FriendService.getFriends(userId);
      const friendIds = friends.map(friend => friend.friendId);
      const activities = await FriendService.getActivities(friendIds);

      if (activities.length === 0) {
        res.status(404).send({ message: '활동 중인 친구가 존재하지 않습니다.' });
        return
      }

      res.send(activities);
      return 
    } catch (error) {

      console.error(error);

      res.status(500).json({
        message: '활동 조회에 실패했습니다.'
      });

      return
    }
  },
  addFriend: async (req: Request, res: Response) => {
    try {
      if (!req.user) {
        res.status(401).send({ message: '로그인이 필요합니다.' })
        return ;
      }

      const { id: userId } = req.user;
      const { friendCode } = req.body;
      const friend = await FriendService.find(friendCode);

      if (!friend) {

        res.status(404).json({
          message: '친구를 찾을 수 없습니다.'
        });

        return
      }

      const friendId = friend.id;

      if (userId === friendId) {  
        res.status(400).json({
          message: '자기 자신을 친구로 추가할 수 없습니다.'
        });
  
        return
      }

      const isExistConnection = await FriendService.isExistConnection(userId, friendId);

      if (isExistConnection) {  
        res.status(409).json({
          message: '이미 친구 추가된 사용자입니다.'
        });
  
        return
      }

      await FriendService.addFriend(userId, friendId);
      res.send({ message: '친구 추가에 성공했습니다.' });
      return
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: '친구 추가에 실패했습니다.'
      });

      return
    }
  },
}