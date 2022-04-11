import { User } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { UserVault } from "../../lib/user-vault"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method == "POST") {
    const { email, phone, name } = req.body
    let user = await UserVault.create({
      email,
      phone,
      name,
      signedUp: new Date(),
      emailVerified: false
    })
    res.status(201).json(user)
  } else {
    let users = await getUsers(req)
    res.status(200).json(users)
  }
}

async function getUsers(req: NextApiRequest): Promise<Array<User>> {
  if (req.query && req.query.q) {
    return await UserVault.query(user => user.fuzzy.match(req.query.q))
  } else {
    return await UserVault.list({})
  }
}
