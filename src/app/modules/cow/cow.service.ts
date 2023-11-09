import ApiError from '../../../errors/ApiError'
import { ICow } from './cow.interface'
import { Cow } from './cow.modal'
import httpStatus from 'http-status'
import { findSeller } from './cow.utils'

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const { ...createdCow } = await Cow.create(cow)

  const res = await findSeller(createCow?.seller)
  console.log('res', res)

  // Type casting to IUser
  const cowResult: ICow | null = createdCow as unknown as ICow

  if (!cowResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Cow!')
  }

  return cowResult
}

export default { createCow }

// {
//     "id": "3",
//     "name": "Daisy",
//     "age": "4 years",
//     "price": "$750",
//     "location": "Comilla",
//     "breed": "Brahman",
//     "weight": "1100 lbs",
//     "label": "sold out",
//     "category": "Dairy",
//     "seller": "Alice Johnson"
// }
