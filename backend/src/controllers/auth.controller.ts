import { Request, Response } from "express";
import { JWTService, UserService } from "@/services";
import { makeHash } from "@/utils";

export const AuthController = {
  signIn: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    try {
      const user = await UserService.findUserByEmail(email);

      if (!user) {
        res.status(404).send({
          message: '가입되지 않은 이메일입니다.',
        });
        return;
      }

      const hashPassword = makeHash(password);

      if (user.password !== hashPassword) {
        res.status(401).send({
          message: '비밀번호가 일치하지 않습니다',
        });
        return;
      }

      const accessToken = JWTService.generateToken({ id: user.id, name: user.username }, 'ACCESS');
      const refreshToken = JWTService.generateToken({ id: user.id, name: user.username }, 'REFRESH');
      
      res.send({
        accessToken,
        refreshToken,
      })
      
      return;
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: '로그인 중 오류가 발생했습니다.',
      });
      return;
    }
  },
  signUp: async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
      const isDuplicateEmail = await UserService.isDuplicateEmail(email);
  
      if (isDuplicateEmail) {
        res.status(409).send({
          message: '이미 사용중인 이메일입니다.',
        });
        return;
      }

      const hashPassword = makeHash(password);

      await UserService.signUp({ username, email, password: hashPassword });
  
      res.status(200).send({
        message: '정상적으로 회원가입되었습니다.',
      })
      return;
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: '회원가입 중 오류가 발생했습니다.',
      });
      return;
    }
  },
  refresh: async (req: Request, res: Response) => {
    const authorization = req.headers.authorization || ''
    try {
      if (!authorization) {
        res.status(401).send({
          message: '토큰이 존재하지 않습니다.',
        });
        return;
      }

      const refreshToken = authorization.split('Bearer ')[1];

      const decoded = JWTService.verifyToken(refreshToken, 'REFRESH');
      
      if (!decoded) {
        res.status(401).send({
          message: '유효하지 않은 토큰입니다.',
        });
        return;
      }

      if (typeof decoded === 'string' || !('payload' in decoded)) {
        res.status(401).send({
          message: '유효하지 않은 토큰'
        });
        return;
      }

      const { id, name } = decoded.payload;
      const user = await UserService.findUser({ id, username: name });

      if (!user) {
        res.status(404).send({
          message: '사용자를 찾을 수 없습니다.',
        });
        return;
      }

      const accessToken = JWTService.generateToken({ id: user.id, name: user }, 'ACCESS');
      res.send({
        accessToken,
      });
    } catch (error) {
      console.error(error);

      res.status(500).send({
        message: '토큰 재발급 중 오류가 발생했습니다.',
      });
      return;
    }
  }
}