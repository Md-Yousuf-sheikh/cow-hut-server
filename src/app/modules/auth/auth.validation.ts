import { z } from 'zod'
const isValidBangladeshiPhoneNumber = (phoneNumber: string): boolean => {
  const bdP = /^[+]?8801[-\s.]?\d{9}$/
  const number = bdP.test(phoneNumber)
  return number
}

const loginUserValidationZodSchema = z.object({
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
  loginUserValidationZodSchema,
  refreshTokenZodSchema,
}
