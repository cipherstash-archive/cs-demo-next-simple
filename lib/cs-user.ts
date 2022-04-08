import { User } from '@prisma/client'
import { Stash } from "@cipherstash/stashjs"
import { v5 as uuidv5 } from 'uuid'

type CSUser = Omit<User, "id"> & { originalId: number, id: string }
const ID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'

const lazyUsers = Stash.connect()
  .then(stash => stash.loadCollection<CSUser>("users"))

export default {
  listUsers: async function(): Promise<Array<User>> {
    const users = await lazyUsers
    return await users.query({})
    .then(users => users.documents.map(user => (
      { ...user, id: user.originalId }
    )))
  },

  putUser: async function(user: User): Promise<string> {
    let mappedId = uuidv5(`${user.id}`, ID_NAMESPACE)
    const users = await lazyUsers

    return await users.put({
      ...user,
      id: mappedId,
      originalId: user.id
    })
  },

  getUser: async function(id: number): Promise<User> {
    let mappedId = uuidv5(`${id}`, ID_NAMESPACE)
    const users = await lazyUsers
    let user = await users.get(mappedId)

    if (user) {
      return { ...user, id: user.originalId }
    } else {
      throw(`No user with id=${id}`)
    }
  }
}

