import { RequestHandler } from 'express'
import userService from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      error: true,
      message: 'Successfully creating user',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  createUser,
}
