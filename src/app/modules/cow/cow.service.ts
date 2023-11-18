import ApiError from '../../../errors/ApiError'
import { ICow } from './cow.interface'
import { Cow } from './cow.modal'
import httpStatus from 'http-status'

// create Cow
const createCow = async (cow: ICow): Promise<ICow | null> => {
  let createdCow = await Cow.create(cow)
  // Type casting to IUser
  const cowResult: ICow | null = createdCow as unknown as ICow

  if (!cowResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Cow!')
  }
  //
  return cowResult
}

// get All Cows
const getAllCows = async (): Promise<ICow | null> => {
  const result = await Cow.find({}).populate({
    path: 'seller',
    select: '-_id name phoneNumber address', // Specify the fields you want to populate
  })
  return result as unknown as ICow | null
}

// getSingleCow
const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate({
    path: 'seller',
    select: '-_id name phoneNumber address', // Specify the fields you want to populate
  })
  return result as ICow | null
}

// updateCow
const updateCow = async (
  id: string,
  payload: Partial<ICow>,
): Promise<ICow | null> => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result as ICow | null
}
// deleteCow
const deleteSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findByIdAndDelete(id)
  return result as ICow | null
}

export default {
  createCow,
  deleteSingleCow,
  updateCow,
  getSingleCow,
  getAllCows,
}

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
