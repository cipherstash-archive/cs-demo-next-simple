import { PrismaClient } from '@prisma/client'
import { UserVault } from "lib/user-vault"

(async function() {

  const prisma = new PrismaClient()

  let prismaUsers = await prisma.user.findMany()
  prismaUsers.forEach(async (user) => {
    if (user.name != "000") {
      console.log(`Migrating '${user.name}'...`)

      await UserVault.put(user)
    }
  })


  //console.log(await UserVault.getAll([1,2,3,4]))

  await prisma.$disconnect()
})()
