import express from 'express'
import orderController from './order.controller'
import validateRequest from '../../middlewares/validateRequest'
import { OrderValidationSchema } from './order.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(OrderValidationSchema.OrderValidationZodSchema),
  orderController.createOrder,
)

export default router
