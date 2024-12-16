import { parseImageUrl } from "@/utils/image";
import { Activity, PrismaClient } from "@prisma/client";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

const KST = 'Asia/Seoul';

const prisma = new PrismaClient();

export interface ActivityWithImages extends Activity {
  images: Express.Multer.File[]
}

export class ActivityService {
  static async create({ title, description, emoji, userId, images }: ActivityWithImages) {
    return await prisma.activity.create({
      data: {
        title,
        description,
        emoji,
        userId,
        images: images && {
          create: images.map((image, index) => ({
              imageUrl: parseImageUrl(image),
              order: index,
            })
          ),
        },
      },
      include: { images: true },
    });
  }

  static async recentId(id: number) {
    return await prisma.activity.findFirst({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: { id: true },
    });
  }

  static async recent(id: number) {
    return await prisma.activity.findFirst({
      where: {
        userId: id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: { images: true },
    });
  }

  
  static async list(userId: number, date: string) {
    // 한국 시간 기준 하루의 시작과 끝
    const startOfDay = dayjs.tz(`${date}T00:00:00`, KST).utc().toDate();
    const endOfDay = dayjs.tz(`${date}T23:59:59.999`, KST).utc().toDate();

    return await prisma.activity.findMany({
      where: {
        userId,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      orderBy: {
      createdAt: 'desc',
      },
      include: { images: true },
    });
  }

  static async detail(id: number) {
    return await prisma.activity.findUnique({
      where: {
        id,
      },
      include: { images: true },
    });
  }

  static async delete(id: number) {
    return await prisma.activity.delete({
      where: {
        id,
      },
    });
  }

  static async update(id: number, { title, description, emoji, images }: ActivityWithImages) {
    return await prisma.activity.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        emoji,
        images: images && {
          create: images.map((image, index) => ({
              imageUrl: image.path,
              order: index,
            })
          ),
        },
      },
      include: { images: true },
    });
  }

  static async exist(id: number) {
    return await prisma.activity.findUnique({
      select: { id: true, userId: true },
      where: {
        id,
      },
    });
  }

  static async updateEndAt(id: number, endAt: Date) {
    return await prisma.activity.update({
      where: {
        id,
      },
      data: {
        endAt,
      },
    });
  }
}