import type { NextApiRequest, NextApiResponse } from "next"
import CsUser from "../../lib/cs-user"

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  
  const users = await CsUser.listUsers()
  res.status(200).json(users)
}
