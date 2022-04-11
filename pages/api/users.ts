import { PrismaClient, User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { UserVault } from "../../lib/user-vault"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const user = await createUser(req)
    res.status(201).json(user)
  } else {
    let users = await getUsers(req)
    res.status(200).json(users)
  }
}

async function createUser(req: NextApiRequest): Promise<User> {
  const { email, phone, name } = req.body

  const user = await prisma.user.create({
    data: {
      email: email,
      phone: phone,
      name: name,
      signedUp: new Date(),
      emailVerified: false
    }
  })
  return await UserVault.put(user)
}

async function getUsers(req: NextApiRequest): Promise<Array<User>> {
  if (req.query && req.query.q) {
    return await UserVault.query(user => user.fuzzy.match(req.query.q))
  } else {
    return await UserVault.list({})
  }
}

// -- Original function

/*async function getUsers(req: NextApiRequest): Promise<Array<User>> {
  if (req.query && req.query.q) {
    let query = req.query.q
    return await prisma.user.findMany({
      where: {
        name: {
          contains: query[0]
        }
      }
    })
  } else {
    return await prisma.user.findMany({})
  } 
}*/

// -- New stash-only create

/*async function newcreateUser(req: NextApiRequest): Promise<User> {
  const { email, phone, name } = req.body
  return await UserVault.create({
    email,
    phone,
    name,
    signedUp: new Date(),
    emailVerified: false
  })
}*/
