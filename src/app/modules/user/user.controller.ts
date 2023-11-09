import { NextFunction, Request, Response } from 'express'
import userService from './user.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const result = await userService.createUser(user)

    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is create successfully!',
      data: result,
    })
    //  next
    // next()
  },
)

export default {
  createUser,
}
