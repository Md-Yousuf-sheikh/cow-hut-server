import { z } from 'zod'
import { userRole } from './user.constant'
const isValidBangladeshiPhoneNumber = (phoneNumber: string): boolean => {
  const bdP = /^[+]?8801[-\s.]?\d{9}$/
  const number = bdP.test(phoneNumber)
  return number
}

const UserValidationZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(1, { message: 'Fist name is required!' }),
      lastName: z.string().optional(),
    }),
    role: z.enum([...userRole] as [string, ...string[]], {
      required_error: 'Role is required!',
    }),
    phoneNumber: z
      .string()
      .min(1, {
        message: 'Number is required!',
      })
      .refine(value => isValidBangladeshiPhoneNumber(value), {
        message: 'Enter a valid Bangladeshi phone number!',
      }),
    address: z.string().min(1, {
      message: 'Address is required!',
    }),
    budget: z.number(),
    income: z.number(),
    password: z.string().min(1, {
      message: 'Password is required!',
    }),
  }),
})

export const UserValidationSchema = { UserValidationZodSchema }
