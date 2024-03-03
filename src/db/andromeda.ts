import { db } from '@/db/prisma'

type IUser = {
  id: string | undefined
  sub?: string | undefined
  name?: string | undefined
  email?: string | undefined
  emailVerified?: string | undefined
  image?: string | undefined
}

type ICreateUser = {
  id?: string | undefined
  sub?: string | undefined
  name: string
  email: string
  emailVerified?: string | undefined
  image?: string | undefined
}

export class Andromeda {
  user = {
    async findUnique({ ...p }: IUser) {
      const prismaUser = await db.user.findUnique({
        where: p,
      })
      return {
        prismaUser,
      }
    },
    async findMany() {
      return db.user.findMany()
    },
    async create(data: ICreateUser) {
      return db.user.create({
        data: {
          ...data,
        },
      })
    },
    async update({ id, ...data }: IUser) {
      return db.user.update({
        where: { id },
        data: {
          ...data,
          email: data.email,
        },
      })
    },
    async delete({ id }: IUser) {
      return db.user.delete({
        where: { id },
      })
    },
  }
}

export const adb = new Andromeda()
