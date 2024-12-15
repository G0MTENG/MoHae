import { FriendController } from '@/controllers';
import Express from 'express';

const router = Express.Router();

router
  .get('/activity', FriendController.activity)
  .get('/', FriendController.friends)
  .post('/', FriendController.addFriend)
  .delete('/:id', FriendController.deleteFriend)

export const friendRouter = router;