import { User } from '../user/user.model'

export const findSeller = async (id: string) => {
  const user = await User.findById(id)
  return user
}
