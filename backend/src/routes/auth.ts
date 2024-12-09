import express from 'express';
import { AuthController } from '@/controllers';
import { AuthValidator } from '@/validators';
import { validate } from '@/middlewares';

const router = express.Router();

router
  .post('/sign-in', AuthController.signIn)
  .post('/sign-up', validate(AuthValidator.signUp),AuthController.signUp);

export default router;
