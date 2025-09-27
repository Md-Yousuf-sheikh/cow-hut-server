import { Model, SortOrder } from 'mongoose'

export type IAdminRole = 'admin' | 'buyer'
export type ILoginAdmin = {
  phoneNumber: string
  password: string
}
export type ILoginAdminResponse = {
  refreshToken?: string
  accessToken: string | undefined
}
export type IRefreshTokenResponse = {
  accessToken: string | undefined
}

export type IAdmin = {
  id?: string
  name: {
    firstName: string
    lastName?: string
  }
  role: IAdminRole
  phoneNumber: string
  address: string
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
interface IAdminMethod {
  isAdminExist(phoneNumber: string): Promise<Partial<IAdmin>>
  isAdminPasswordMatch(
    givenPassword: string,
    savedPassword: string | undefined,
  ): Promise<boolean>
}

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethod>
