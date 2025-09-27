import { z } from 'zod'
const OrderValidationZodSchema = z.object({
  body: z.object({
    cow: z.string().min(1, { message: 'Cow is required!' }),
    buyer: z.string().min(1, { message: 'Buyer is required!' }),
  }),
})

export const OrderValidationSchema = { OrderValidationZodSchema }
