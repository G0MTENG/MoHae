import { makeHash, makeRandomCode } from "@/utils";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  static async signUp({ username, email, password }: Pick<User, 'username' | 'email' | 'password'>) {
    const hashPassword = makeHash(password);
    const randomCode = makeRandomCode();
    return await prisma.user.create({
      data: {
        username,
        email,
        randomCode,
        password: hashPassword,
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
}