import { Request, Response } from "express";
import { UserService } from "@/services";

export const AuthController = {
  signIn: async (req: Request, res: Response) => {
    
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

      await UserService.signUp({ username, email, password });
  
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
    // refresh logic
  }
}