import { UserController } from '@/controllers/user.controller'
import express from 'express'

const router = express.Router()

router
  .get('/user', UserController.user)

export const userRouter = router