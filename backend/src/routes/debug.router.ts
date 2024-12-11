import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';

const router = express.Router();

const prisma = new PrismaClient();

router
  .get('/users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();

    res.send(users);
    return 
  })

export const debugRouter = router;