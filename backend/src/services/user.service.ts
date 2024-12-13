import { makeRandomCode } from "@/utils";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  static async info(id: number) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        randomCode: true,
      }
    });
  }

  static async signUp({ username, email, password }: Pick<User, 'username' | 'email' | 'password'>) {
    return await prisma.user.create({
      data: {
        username,
        email,
        password,
        randomCode: makeRandomCode(),
      },
    });
  }

  static async isDuplicateEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user !== null
  }

  static async deleteAllUsers() {
    await prisma.user.deleteMany();
  }

  static async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  static async findUser(filter: Partial<User>) {
    return await prisma.user.findFirst({
      where: {
        ...filter,
      },
    });
  }
}