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

type IWorkspace = {
  id: string | undefined
  name: string | undefined
  slug: string | undefined
  userId: string | undefined
}

type ICreateWorkspace = {
  id?: string
  name: string
  slug: string
  userId: string
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

  // Generate workspace schema
  workspace = {
    async findUnique({ ...p }: IWorkspace) {
      const prismaWorkspace = await db.workspace.findUnique({
        where: p,
      })
      return {
        prismaWorkspace,
      }
    },
    async findMany() {
      return db.workspace.findMany()
    },
    async create(data: ICreateWorkspace) {
      return db.workspace.create({
        data: {
          ...data,
        },
      })
    },
    async update({ id, ...data }: IWorkspace) {
      return db.workspace.update({
        where: { id },
        data: {
          ...data,
        },
      })
    },
    async delete({ id }: IWorkspace) {
      return db.workspace.delete({
        where: { id },
      })
    },
  }
}

export const adb = new Andromeda()
