import { IOptions, IOptionsResult } from '../app/modules/user/user.interface'

const calculatePagination = (options: Partial<IOptions>): IOptionsResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit

  //   sortBy
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'
  const minPrice = Number(options.minPrice) || undefined
  const maxPrice = Number(options.maxPrice) || undefined
  const location = options.location
  //
  //   console.log('options', options)

  return {
    skip,
    limit,
    page,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    location,
  }
}

export const paginationHelper = {
  calculatePagination,
}
