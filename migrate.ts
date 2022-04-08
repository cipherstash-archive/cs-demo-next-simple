import { PrismaClient } from '@prisma/client'
import CSUser from "lib/cs-user"

(async function() {
  const prisma = new PrismaClient()

  await prisma.user.findMany()
    .then(prismaUsers => (
      prismaUsers.forEach(async (user) => {
        console.log(`Migrating ${user.name}...`)

        await CSUser.putUser(user)
      }
    )))

  await prisma.$disconnect()
})()
