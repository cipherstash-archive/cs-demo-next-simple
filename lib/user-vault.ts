import { User, PrismaClient } from '@prisma/client'
import { RecordMapper, CollectionAPI } from '@cipherstash/stashjs-adapter'

const prisma = new PrismaClient()

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
    let dummyUser = await prisma.user.create({
      data: {
        email: "000",
        phone: "000",
        name: "000",
        signedUp: new Date(1970),
        emailVerified: false,
        stashId
      }
    })
    return dummyUser.id
  }
}

const userMapper = new UserMapper()
export const UserVault = new CollectionAPI<User>("users", userMapper)
