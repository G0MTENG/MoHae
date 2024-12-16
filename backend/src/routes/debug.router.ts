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
  .get('/activities', async (req: Request, res: Response) => {
    const activities = await prisma.activity.findMany({
      include: { images: true },
    });

    res.send(activities);
    return 
  })
  .get('/connections', async (req: Request, res: Response) => {
    const friends = await prisma.connection.findMany();

    res.send(friends);
    return 
  })

export const debugRouter = router;