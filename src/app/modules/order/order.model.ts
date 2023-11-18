import { Schema, model, models } from 'mongoose'
import { IOrder } from './order.interface'

const orderSchema = new Schema<IOrder>({
  cow: {
    type: Schema.ObjectId,
    required: true,
  },
  buyer: {
    type: Schema.ObjectId,
    required: true,
  },
})

export const Order = model<IOrder>('Order', orderSchema)
