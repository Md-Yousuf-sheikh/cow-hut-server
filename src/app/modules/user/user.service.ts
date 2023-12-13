import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelper } from '../../../helpers/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions, IUser } from './user.interface'
import { User } from './user.model'
import { generateUserId } from './user.utils'
import httpStatus from 'http-status'

//  create user
const createUser = async (user: IUser): Promise<IUser | null> => {
  //  auto generate increment id
  const id = await generateUserId()
  user.id = id ?? '0001'
  //  password hash
  // user.password = await bcrypt.hash(
  //   user?.password,
  //   Number(config.bcrypt_salt_rounds),
  // )
  //  create
  const createdUser = await User.create(user)
  // Type casting to IUser
  const userResult: IUser | null = createdUser as unknown as IUser

  if (!userResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!')
  }

  return userResult
}
// get single user
const getSingleUser = async (id: string) => {
  const result = await User.findById(id)
  return result as IUser | null
}
// get single user
const getUsers = async (
  paginationOption: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { skip, limit, page, sortBy, sortOrder, minPrice, maxPrice, location } =
    paginationHelper.calculatePagination(paginationOption)

  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  //
  // Build additional filters for minPrice, maxPrice, and location
  const filters: any = {}
  if (minPrice !== undefined) {
    filters.budget = { $gte: minPrice }
  }
  if (maxPrice !== undefined) {
    filters.budget = { ...filters.budget, $lte: maxPrice }
  }
  if (location) {
    filters.address = { $regex: new RegExp(location, 'i') }
  }
  const result = await User.find({ ...filters })
    .skip(skip)
    .limit(limit)
    .sort(sortCondition)
    .lean()

  return {
    meta: {
      page,
      limit,
      total: 10,
    },
    data: result as unknown as IUser[],
  }
}
// delete single user
const deleteSingleUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id)
  return result
}
// update single user
const updateSingleUser = async (id: string, payload: Partial<IUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result as IUser | null
}
export default {
  createUser,
  getSingleUser,
  deleteSingleUser,
  getUsers,
  updateSingleUser,
}

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
