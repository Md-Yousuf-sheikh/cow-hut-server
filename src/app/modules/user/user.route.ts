import express from 'express'
import userController from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidationSchema } from './user.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enumes/user'

const router = express.Router()

router.get('/:id', userController.getSingleUser)
router.delete('/:id', userController.deleteSingleUser)
router.patch('/:id', userController.updateSingleUser)
router.get(
  '/',
  auth(ENUM_USER_ROLE.USER_BUYER, ENUM_USER_ROLE.USER_SELLER),
  userController.getUser,
)
router.post(
  '/signup',
  validateRequest(UserValidationSchema.UserValidationZodSchema),
  userController.createUser,
)

export default router
