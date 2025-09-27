import { NextFunction, Request, Response } from 'express'
import adminService from './admin.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import config from '../../../config'
//
//  create user
const createAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const admin = req.body
    const result = await adminService.createAdmin(admin)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully',
      data: result,
    })
  },
)
//  create user
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const result = await adminService.loginAuthUser(user)
    const { refreshToken, ...others } = result
    //  set cookie
    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOption)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin logged successfully',
      data: others,
    })
    //  next
    // next()
  },
)

//  create refresh token
const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.cookies
    const result = await adminService.refreshToken(refreshToken)

    //  set cookie
    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOption)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users login successfully',
      data: result,
    })
    //  next
    next()
  },
)

export default {
  loginUser,
  refreshToken,
  createAdmin,
}
