import express, { Response } from 'express'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
  meta?: {
    page: number
    limit: number
    total: number
  } | null
}

const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  //  data response send
  const responseData: IApiResponse<T> = {
    statusCode: data?.statusCode,
    success: data?.success,
    message: data.message || null,
    meta: data?.meta || null,
    data: data?.data || null,
  }
  res.status(data?.statusCode).json(responseData)
}

export default sendResponse