import mongoose, { Schema } from 'mongoose'
import { Cow } from '../cow/cow.modal'
import { User } from '../user/user.model'

export const findBuyer = async (id: Schema.Types.ObjectId) => {
  const user = await User.findById(id)
  return user
}

export const findCow = async (id: Schema.Types.ObjectId) => {
  const cow = await Cow.findById(id)
  return cow
}
