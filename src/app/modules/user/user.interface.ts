import { Model, SortOrder } from 'mongoose'

export type IUserRole = 'seller' | 'buyer'

export type IUser = {
  id?: string
  name: {
    firstName: string
    lastName?: string
  }
  role: IUserRole
  phoneNumber: string
  address: string
  budget?: number
  income?: number
  password: string
}

// Define a type for pagination options
export type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  minPrice?: number
  maxPrice?: number
  location?: string
}

// Define a type for pagination options
export type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
  minPrice?: number
  maxPrice?: number
  location?: string
}

// Define a type for pagination options
export type IOptions = {
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
  minPrice?: number
  maxPrice?: number
  location?: string
}

// /
interface IUserMethod {
  isUserExist(phoneNumber: string): Promise<Partial<IUser>>
  isUserPasswordMatch(
    givenPassword: string,
    savedPassword: string | undefined,
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethod>
