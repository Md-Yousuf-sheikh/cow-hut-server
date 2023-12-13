import { NextFunction, Request, Response } from 'express'
import authService from './auth.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import config from '../../../config'
import { ILoginUserResponse } from './auth.interface'

//  create user
const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const result = await authService.loginAuthUser(user)
    const { refreshToken, ...others } = result
    //  set cookie
    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOption)
    //   response
    sendResponse<ILoginUserResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully',
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
    const result = await authService.refreshToken(refreshToken)

    //  set cookie
    const cookieOption = {
      secure: config.env === 'production',
      httpOnly: true,
    }
    res.cookie('refreshToken', refreshToken, cookieOption)
    //   response
    sendResponse<ILoginUserResponse>(res, {
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
}
