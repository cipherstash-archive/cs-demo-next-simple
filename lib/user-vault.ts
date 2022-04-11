import { PrismaClient } from '@prisma/client'
import { RecordMapper, CollectionAPI } from '@cipherstash/stashjs-adapter'

const prisma = new PrismaClient()

export type User = {
  id: number
  email: string
  phone: string
  name: string
  signedUp: Date
  emailVerified: boolean
  stashId: string
}

class UserMapper implements RecordMapper {
  async setStashId(record: {id: number}, stashId: string | null) {
    await prisma.user.update({
      where: { id: record.id },
      data: { stashId: stashId }
    })
  }

  async findStashIdsFor(ids: Array<number>): Promise<Array<string>> {
    let result = await prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: { stashId: true}
    })
    return result.flatMap(({ stashId }) => stashId ? [stashId] : [])
  }

  async newIdFor(stashId: string): Promise<number> {
    let user = await prisma.user.create({
      data: { stashId }
    })
    return user.id
  }
}

const userMapper = new UserMapper()
export const UserVault = new CollectionAPI<User>("users", userMapper)
