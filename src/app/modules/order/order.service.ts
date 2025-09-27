import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IOrder } from './order.interface'
import { Order } from './order.model'
import mongoose from 'mongoose'
import { findCow, findBuyer } from './order.utils'
import { number } from 'zod'

const createOrder = async (order: IOrder) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    // 1. Check if the user has enough money to buy the cow
    const buyer = await findBuyer(order?.buyer)
    const cow = await findCow(order?.cow)

    if (!buyer) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer not found')
    }

    if (!cow) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow not found')
    }

    if (!(cow?.label?.toLowerCase() == 'sold out')) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Cow is sold out')
    }

    // budget
    const budget = Number(buyer.budget)
    const cowPrice = Number(cow.price)
    if (budget < cowPrice) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'Insufficient funds to buy the cow',
      )
    }

    const seller = await findBuyer(cow.seller)
    if (!seller) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not found')
    }

    await cow.updateOne({ label: 'sold out' }, { session })
    await buyer.updateOne({ $inc: { budget: -cowPrice } }, { session })
    await seller.updateOne({ $inc: { income: cowPrice } }, { session })
    let orderCreate = await Order.create([order], { session })

    // 3. Commit transaction
    await session.commitTransaction()

    // 4. Return the orderCreate
    return orderCreate
  } catch (error) {
    // 5. If any error happens, abort the transaction
    await session.abortTransaction()
    throw error
  } finally {
    // 6. End the session
    await session.endSession()
  }
}

export default { createOrder }
