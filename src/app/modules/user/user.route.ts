import express from 'express'
import userController from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidationSchema } from './user.validation'

const router = express.Router()

router.get('/:id', userController.getSingleUser)
router.delete('/:id', userController.deleteSingleUser)
router.patch('/:id', userController.updateSingleUser)
router.get('/', userController.getUser)
router.post(
  '/signup',
  validateRequest(UserValidationSchema.UserValidationZodSchema),
  userController.createUser,
)

export default router
