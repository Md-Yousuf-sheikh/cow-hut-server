import express from 'express'
import cowController from './cow.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidationSchema } from './cow.validation'

const router = express.Router()

router.post(
  '/create-cow',
  validateRequest(CowValidationSchema.CowValidationZodSchema),
  cowController.createCow,
)

export default router
