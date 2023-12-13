import { NextFunction, Request, Response } from 'express'
import userService from './user.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'
import pick from '../../../shared/pick'
import { paginationFiled } from '../../../constant/pagination'

//  create user
const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body
    const result = await userService.createUser(user)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users created successfully',
      data: result,
    })
  },
)
//  get single user
const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOption = pick(req.query, paginationFiled)
    const result = await userService.getUsers(paginationOption)
    console.log('result', req.cookies)

    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      meta: result?.meta,
      data: result?.data,
    })
  },
)
//  get single user
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await userService.getSingleUser(id)

    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    })
    //  next
    // next()
  },
)
//  user delete
const deleteSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    const result = await userService.deleteSingleUser(id)

    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Uers deleted successfully',
      data: result,
    })
  },
)
//  user update
const updateSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req?.params?.id // Assuming the cow ID is passed as a route parameter
    const userUpdateData = req?.body
    const result = await userService.updateSingleUser(userId, userUpdateData)

    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    })
  },
)

export default {
  createUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  getUser,
}
