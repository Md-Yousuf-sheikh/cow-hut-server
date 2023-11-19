import { IOptions, IOptionsResult } from '../app/modules/user/user.interface'

const calculatePagination = (options: Partial<IOptions>): IOptionsResult => {
  const page = Number(options.page || 1)
  const limit = Number(options.limit || 10)
  const skip = (page - 1) * limit

  //   sortBy
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}

export const paginationHelper = {
  calculatePagination,
}
