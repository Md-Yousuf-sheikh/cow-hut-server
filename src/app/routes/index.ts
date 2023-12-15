import express from 'express'
import cowsRouter from '../modules/cow/cow.route'
import authRouter from '../modules/auth/auth.route'
import userRouter from '../modules/user/user.route'
import orderRouter from '../modules/order/order.route'
import adminsRouter from '../modules/admins/admin.route'

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
  {
    path: '/admins',
    route: adminsRouter,
  },
]

//  all routes add use...
moduleRouts.forEach(route => router.use(route.path, route.route))

export default router
