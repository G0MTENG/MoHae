import { JWTService, UserService } from '@/services'
import { Request, Response } from 'express'

export const JWTController = {
  refresh: async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || ''
    try {
      if (!authorization) {
        throw new Error('토큰이 존재하지 않습니다.')
      }

      const refreshToken = authorization.split('Bearer ')[1]
      const decoded = JWTService.verifyToken(refreshToken, 'REFRESH')

      if (!decoded) {
        throw new Error('유효하지 않은 토큰입니다.')
      }

      if (typeof decoded === 'string' || !('id' in decoded || 'name' in decoded)) {
        throw new Error('decoded 타입가드 에러입니다.')
      }

      const { id, name } = decoded
      const user = await UserService.findUser({ id, username: name })

      if (!user) {
        throw new Error('사용자를 찾을 수 없습니다')
      }

      const accessToken = JWTService.generateToken({ id: user.id, name: user.username }, 'ACCESS')
      res.send({
        accessToken,
      })
      return
    } catch (error) {
      console.error(error)

      res.status(500).send({
        message: '토큰 재발급 중 오류가 발생했습니다.',
      })
      return
    }
  },
  access: async (req: Request, res: Response, next: Function) => {
    const authorization = req.headers.authorization || ''

    try {
      if (!authorization) {
        throw new Error('JWT ERROR: 토큰이 존재하지 않습니다.')
      }

      const token = authorization.split('Bearer ')[1]

      const decoded = JWTService.verifyToken(token, 'ACCESS')

      if (!decoded) {
        throw new Error('JWT ERROR: 유효하지 않은 토큰입니다.')
      }

      if (typeof decoded === 'string' || !('id' in decoded || 'name' in decoded)) {
        throw new Error('JWT ERROR: decoded 타입가드 에러입니다.')
      }

      const { id, name } = decoded
      const user = await UserService.findUser({ id, username: name })

      if (!user) {
        throw new Error('JWT ERROR: 유저가 존재하지 않습니다.')
      }

      req.user = user
      next()
    } catch (error) {
      console.error(error)
      res.status(401).send({
        message: '유효하지 않은 토큰입니다.',
      })
      return
    }
  },
}
