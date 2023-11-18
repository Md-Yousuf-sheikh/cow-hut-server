import { NextFunction, Request, Response } from 'express'
import cowService from './cow.service'
import catchAsync from '../../../shared/catchAsync'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

// create Cow
const createCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...user } = req.body
    const result = await cowService.createCow(user)
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow created successfully',
      data: result,
    })
  },
)
// get Cows
const getCows = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await cowService.getAllCows()
    //   response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cows retrieved successfully',
      data: result,
    })
  },
)
// get Single Cow
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await cowService.getSingleCow(id)
  //   response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cows retrieved successfully',
    data: result,
  })
  //  next
  // next()
})
// delete Single Cow
const deleteSingleCow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  await cowService.deleteSingleCow(id)
  // Response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cow deleted successfully',
    data: null,
  })
})
//  update Cow
const updateSingleCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const cowId = req.params.id // Assuming the cow ID is passed as a route parameter
    const updatedCowData = req.body
    const result = await cowService.updateCow(cowId, updatedCowData)
    // Response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow updated successfully',
      data: result,
    })

    // Next
    // next();
  },
)

// export
export default {
  createCow,
  deleteSingleCow,
  updateSingleCow,
  getCows,
  getSingleCow,
}
