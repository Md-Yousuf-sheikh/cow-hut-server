import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import orderService from './order.service'

const createOrder = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body
    const result = await orderService.createOrder(body)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    })
  },
)

export default {
  createOrder,
}
