import express from 'express'
import userController from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidationSchema } from './user.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.USER_ADMIN),
  userController.getSingleUser,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER_ADMIN),
  userController.deleteSingleUser,
)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER_ADMIN),
  userController.updateSingleUser,
)
router.get('/', auth(ENUM_USER_ROLE.USER_ADMIN), userController.getUser)
router.post(
  '/signup',
  validateRequest(UserValidationSchema.UserValidationZodSchema),
  userController.createUser,
)

export default router
