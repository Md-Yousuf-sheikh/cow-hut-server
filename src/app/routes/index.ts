import express from 'express'
import userRouter from '../modules/user/user.route'
import authRouter from '../modules/auth/auth.route'
import cowsRouter from '../modules/cow/cow.route'
import orderRouter from '../modules/order/order.route'

const router = express.Router()

//  Application routes
const moduleRouts = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/cows',
    route: cowsRouter,
  },
  {
    path: '/orders',
    route: orderRouter,
  },
]

//  all routes add use...
moduleRouts.forEach(route => router.use(route.path, route.route))

export default router
