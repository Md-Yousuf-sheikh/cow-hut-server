import { z } from 'zod'
import { adminRole } from './admin.constant'
const isValidBangladeshiPhoneNumber = (phoneNumber: string): boolean => {
  const bdP = /^[+]?8801[-\s.]?\d{9}$/
  const number = bdP.test(phoneNumber)
  return number
}

const createAdminValidationZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().min(1, { message: 'Fist name is required!' }),
      lastName: z.string().optional(),
    }),
    role: z.enum([...adminRole] as [string, ...string[]], {
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
    password: z.string().min(1, {
      message: 'Password is required!',
    }),
  }),
})

const loginAdminValidationZodSchema = z.object({
  body: z.object({
    phoneNumber: z
      .string()
      .min(1, {
        message: 'Number is required!',
      })
      .refine(value => isValidBangladeshiPhoneNumber(value), {
        message: 'Enter a valid Bangladeshi phone number!',
      }),
    password: z.string().min(1, {
      message: 'Password is required!',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

export const authUserValidationSchema = {
  loginAdminValidationZodSchema,
  refreshTokenZodSchema,
  createAdminValidationZodSchema,
}
