import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'
import httpStatus from 'http-status'
const createUser = async (user: IUser): Promise<IUser | null> => {
  //  auto generate increment id
  const id = await generateUserId()
  user.id = id ?? '0001'

  const createdUser = await User.create(user)

  // Type casting to IUser
  const userResult: IUser | null = createdUser as unknown as IUser

  if (!userResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }

  return userResult
}

export default { createUser }

// {
//     "name": {
//         "firstName": "NNN",
//         "lastName": "Sheikh"
//     },
//     "role": "seller",
//     "phoneNumber": "8801701234567",
//     "address": "123 Main St",
//     "budget": 50000,
//     "income": 60000,
//     "password": "password123"
// }
