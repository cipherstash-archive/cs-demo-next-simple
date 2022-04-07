import { PrismaClient, User } from '@prisma/client'
import { Stash } from "@cipherstash/stashjs"
import { v5 as uuidv5 } from 'uuid'

type CSUser = Omit<User, "id"> & { originalId: number, id: string }

(async function() {
  const ID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'
  const prisma = new PrismaClient()
  const stash = await Stash.connect()
  const users = await stash.loadCollection<CSUser>("users")

  async function putUser(user: User): Promise<string> {
    let mappedId = uuidv5(`${user.id}`, ID_NAMESPACE)

    return await users.put({
      ...user,
      id: mappedId,
      originalId: user.id
    })
  }

  async function getUser(id: number): Promise<User> {
    let mappedId = uuidv5(`${id}`, ID_NAMESPACE)
    let user = await users.get(mappedId)

    if (user) {
      return { ...user, id: user.originalId }
    } else {
      throw(`No user with id=${id}`)
    }
  }

  await prisma.user.findMany()
    .then(prismaUsers => (
      prismaUsers.forEach(async (user) => {
        console.log(`Migrating ${user.name}...`)

        await putUser(user)
      }
    )))

  console.log(await getUser(1))

  await prisma.$disconnect()
})()
