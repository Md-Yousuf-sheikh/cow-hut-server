import mongoose from 'mongoose'
import { User } from '../user/user.model'

export const findSeller = async (id: string) => {
  const objectId = new mongoose.Types.ObjectId(id) // Convert the string ID to a Mongoose ObjectId
  const user = await User.findById(objectId).populate('seller')

  console.log('user', user)
}
