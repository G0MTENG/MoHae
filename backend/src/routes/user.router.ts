import { upload } from '@/configs/multer'
import { UserController } from '@/controllers/user.controller'
import express from 'express'

const router = express.Router()

router
  .get('/user', UserController.user)
  .put('/profile', upload.single('avatar'), UserController.updateProfile)

export const userRouter = router