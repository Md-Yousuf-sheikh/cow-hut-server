import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import Routes from './app/routes'
import sendResponse from './shared/sendResponse'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'

const app: Application = express()

// using cors
app.use(cors())
// console.log(app.get('env'))

// parse

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//  Application routes
app.use('/api/v1/', Routes)

app.get('/', async (req: Request, res: Response) => {
  // sendResponse
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Server Running Successful ->  Cow Hut Server ',
  })
})
// globalErrorHandler
app.use(globalErrorHandler)
export default app
