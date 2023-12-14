import express from 'express'
import cowController from './cow.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidationSchema } from './cow.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enumes/user'

const router = express.Router()

router.get('/:id', cowController.getSingleCow)
router.patch('/:id', cowController.updateSingleCow)
router.delete('/:id', cowController.deleteSingleCow)
router.get(
  '/',
  auth(ENUM_USER_ROLE.USER_SELLER, ENUM_USER_ROLE.USER_BUYER),
  cowController.getCows,
)
router.post(
  '/',
  validateRequest(CowValidationSchema.CowValidationZodSchema),
  cowController.createCow,
)

export default router
