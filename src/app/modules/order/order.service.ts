import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IOrder } from './order.interface'
import { Order } from './order.model'

// create Cow
const createOrder = async (order: IOrder): Promise<IOrder | null> => {
  let orderCreate = await Order.create(order)
  // Type casting to IUser
  const ordered: IOrder | null = orderCreate as unknown as IOrder

  if (!ordered) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create order')
  }
  return ordered
}

export default { createOrder }
