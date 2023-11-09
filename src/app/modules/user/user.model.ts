import { Model, Schema, model } from 'mongoose'
import { IUser } from './user.interface'
import { userRole } from './user.constant'

type UserModel = Model<IUser, object>

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      required: true,
      enum: userRole,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      default: 0,
      required: true,
    },
    income: {
      type: Number,
      default: 0,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const User = model<UserModel>('User', userSchema)
