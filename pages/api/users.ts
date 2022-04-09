import type { NextApiRequest, NextApiResponse } from "next"
import SecureUser from "../../lib/user-vault"

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const users = await SecureUser.list()
  res.status(200).json(users)
}
