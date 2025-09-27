import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import orderService from './order.service'
import { findCow } from './order.utils'

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body

    const result = await orderService.createOrder(body)
    const cow = await findCow(body.cow)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully',
      data: cow,
    })
    // next()
  },
)

export default {
  createOrder,
}
