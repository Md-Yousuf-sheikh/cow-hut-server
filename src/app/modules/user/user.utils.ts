import { User } from './user.model'

export const findLastUserId = async () => {
  const lastUser = await User?.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()

  console.log('last user is', lastUser)

  return lastUser?.id
}

export const generateUserId = async () => {
  const lastUserId = await findLastUserId()
  const currentId = lastUserId || '0'.padStart(5, '0')

  // increment id
  const incrementId = (parseInt(currentId) + 1)?.toString().padStart(5, '0')
  return incrementId
}
