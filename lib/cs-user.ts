import { User } from '@prisma/client'
import { Stash } from "@cipherstash/stashjs"
import { v5 as uuidv5 } from 'uuid'

type CSUser = Omit<User, "id"> & { originalId: number, id: string }

export default (async function() {
  const ID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'
  const stash = await Stash.connect()
  const users = await stash.loadCollection<CSUser>("users")

  return {
    listUsers: async function(): Promise<Array<User>> {
      return await users.query({})
        .then(users => users.documents.map(user => (
          { ...user, id: user.originalId }
        )))
    },

    putUser: async function(user: User): Promise<string> {
      let mappedId = uuidv5(`${user.id}`, ID_NAMESPACE)

      return await users.put({
        ...user,
        id: mappedId,
        originalId: user.id
      })
    },

    getUser: async function(id: number): Promise<User> {
      let mappedId = uuidv5(`${id}`, ID_NAMESPACE)
      let user = await users.get(mappedId)

      if (user) {
        return { ...user, id: user.originalId }
      } else {
        throw(`No user with id=${id}`)
      }
    }
  }
})()
