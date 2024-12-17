import { JWTController } from '@/controllers/jwt.controller'
import express from 'express'

const router = express.Router()

router.post('/refresh', JWTController.refresh).use(JWTController.access)

export const jwtRouter = router
