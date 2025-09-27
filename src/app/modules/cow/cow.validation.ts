import { z } from 'zod'
import { cowBreed, cowCategory, cowLabel, cowLocation } from './cow.constant'

const CowValidationZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required!' }),
    age: z.string().min(1, { message: 'Age is required!' }),
    price: z.string().min(1, { message: 'Price is required!' }),
    location: z.enum([...cowLocation] as [string, ...string[]], {
      required_error: 'Location is required!',
    }),
    breed: z.enum([...cowBreed] as [string, ...string[]], {
      required_error: 'Breed is required!',
    }),
    weight: z.string().min(1, { message: 'Weight is required!' }),
    label: z.enum([...cowLabel] as [string, ...string[]]),
    category: z.enum([...cowCategory] as [string, ...string[]], {
      required_error: 'Category is required!',
    }),
    seller: z.string().optional(),
  }),
})

export const CowValidationSchema = { CowValidationZodSchema }
