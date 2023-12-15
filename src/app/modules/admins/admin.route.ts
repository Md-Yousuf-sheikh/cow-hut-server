import express from 'express'
import authController from './admin.controller'
import validateRequest from '../../middlewares/validateRequest'
import { authUserValidationSchema } from './admin.validation'

const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(authUserValidationSchema.createAdminValidationZodSchema),
  authController.createAdmin,
)

router.post(
  '/login',
  validateRequest(authUserValidationSchema.loginAdminValidationZodSchema),
  authController.loginUser,
)

router.post(
  '/refresh-token',
  validateRequest(authUserValidationSchema.refreshTokenZodSchema),
  authController.refreshToken,
)

export default router
