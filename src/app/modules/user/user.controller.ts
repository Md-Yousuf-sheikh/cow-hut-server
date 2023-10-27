import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await userService.createUser(user)
    res.status(200).json({
      error: true,
      message: 'Successfully creating user',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      error: true,
      message: 'Failed creating user',
      data: null,
    })
  }
}

export default {
  createUser,
}
