import { NextFunction, Request, RequestHandler, Response } from 'express'
import cowService from './cow.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...user } = req.body
    const result = await cowService.createCow(user)

    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow added successfully!',
      data: result,
    })
    //  next
    // next()
  },
)

export default {
  createCow,
}
