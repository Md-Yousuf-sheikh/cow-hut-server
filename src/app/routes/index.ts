import express from 'express'
import userRouter from '../modules/user/user.route'
import cowsRouter from '../modules/cow/cow.route'

const router = express.Router()

//  Application routes
const moduleRouts = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/cows',
    route: cowsRouter,
  },
]

//  all routes add use...
moduleRouts.forEach(route => router.use(route.path, route.route))

export default router
