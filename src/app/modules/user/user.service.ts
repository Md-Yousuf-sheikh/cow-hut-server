import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //  auto generate increment id
  const id = await generateUserId()
  user?.id = id ?? '0001'

  const createdUser = await User.create(user)

  //  if error
  if (!createdUser) {
    throw new Error('Failed to create user!')
  }

  return createdUser
}

export default { createUser }
