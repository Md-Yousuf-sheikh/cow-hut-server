import express from 'express'
import authController from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { authUserValidationSchema } from './auth.validation'

const router = express.Router()

router.post(
  '/login',
  validateRequest(authUserValidationSchema.loginUserValidationZodSchema),
  authController.loginUser,
)
router.post(
  '/refresh-token',
  validateRequest(authUserValidationSchema.refreshTokenZodSchema),
  authController.refreshToken,
)

export default router
