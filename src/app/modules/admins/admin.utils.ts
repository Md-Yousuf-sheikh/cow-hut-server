import { Admin } from './admin.model'

export const findLastAdminId = async () => {
  const lastAdmin = await Admin?.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastAdmin?.id
}

export const generateAdminId = async () => {
  const lastUserId = await findLastAdminId()
  const currentId = lastUserId || '0'.padStart(5, '0')

  // increment id
  const incrementId = (parseInt(currentId) + 1)?.toString().padStart(5, '0')
  return incrementId
}
