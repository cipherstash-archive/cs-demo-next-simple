import { User } from '@prisma/client'
import { CollectionAPI } from '@cipherstash/stashjs-adapter'

const ID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341'

const UserVault = new CollectionAPI<User>("users", ID_NAMESPACE)
export default UserVault

