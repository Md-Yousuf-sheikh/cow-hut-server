import express from 'express'
import cowController from './cow.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CowValidationSchema } from './cow.validation'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.USER_SELLER,
    ENUM_USER_ROLE.USER_BUYER,
    ENUM_USER_ROLE.USER_ADMIN,
  ),
  cowController.getSingleCow,
)
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.USER_SELLER),
  cowController.updateSingleCow,
)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.USER_SELLER, ENUM_USER_ROLE.USER_ADMIN),
  cowController.deleteSingleCow,
)
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.USER_SELLER,
    ENUM_USER_ROLE.USER_BUYER,
    ENUM_USER_ROLE.USER_ADMIN,
  ),
  cowController.getCows,
)
router.post(
  '/',
  auth(ENUM_USER_ROLE.USER_SELLER, ENUM_USER_ROLE.USER_ADMIN),
  validateRequest(CowValidationSchema.CowValidationZodSchema),
  cowController.createCow,
)

export default router
