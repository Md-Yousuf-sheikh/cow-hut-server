import { SortOrder } from 'mongoose'

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
}

// Define a type for pagination options
export type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}

// Define a type for pagination options
export type IOptions = {
  page: number
  limit: number
  sortBy: string
  sortOrder: SortOrder
}
