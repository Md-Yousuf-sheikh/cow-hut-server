import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import { userRole } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../../config'

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
      unique: true,
      index: true,
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
      select: false, // Exclude from queries by default
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password // Exclude password from the JSON representation
      },
    },
  },
)
//
userSchema.methods.isUserExist = async function (
  phoneNumber: string,
): Promise<Partial<IUser> | null | unknown> {
  const user = await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1 },
  )
  return user
}

// isPasswordMatch

userSchema.methods.isUserPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<Boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword)

  return isMatch
}
//
userSchema.pre('save', async function (next) {
  //
  const user = this
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds),
  )
  //
  next()
})

export const User = model<IUser, UserModel>('User', userSchema)
