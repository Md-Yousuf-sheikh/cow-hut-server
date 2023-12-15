import { Schema, model } from 'mongoose'
import { IAdmin, AdminModel } from './admin.interface'
import { adminRole } from './admin.constant'
import bcrypt from 'bcrypt'
import config from '../../../config'

const adminSchema = new Schema<IAdmin>(
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
      enum: adminRole,
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
adminSchema.methods.isAdminExist = async function (
  phoneNumber: string,
): Promise<Partial<IAdmin> | null | unknown> {
  const admin = await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 },
  )
  return admin
}

// isPasswordMatch

adminSchema.methods.isAdminPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<Boolean> {
  const isMatch = await bcrypt.compare(givenPassword, savedPassword)

  return isMatch
}
//
adminSchema.pre('save', async function (next) {
  //
  const admin = this
  admin.password = await bcrypt.hash(
    admin?.password,
    Number(config.bcrypt_salt_rounds),
  )
  //
  next()
})

export const Admin = model<IAdmin, AdminModel>('Admin', adminSchema)
