import express from 'express'
import cowController from './cow.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidationSchema } from './cow.validation'

const router = express.Router()

router.get('/:id', cowController.getSingleCow)
router.patch('/:id', cowController.updateSingleCow)
router.delete('/:id', cowController.deleteSingleCow)
router.get('/', cowController.getCows)
router.post(
  '/',
  validateRequest(CowValidationSchema.CowValidationZodSchema),
  cowController.createCow,
)

export default router
