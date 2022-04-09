import { PrismaClient } from '@prisma/client'
import SecureUser from "lib/user-vault"

(async function() {

  const prisma = new PrismaClient()

  await prisma.user.findMany()
    .then(prismaUsers => (
      prismaUsers.forEach(async (user) => {
        console.log(`Migrating ${user.name}...`)

        await SecureUser.put(user)
      }
    )))

  await prisma.$disconnect()
})()
