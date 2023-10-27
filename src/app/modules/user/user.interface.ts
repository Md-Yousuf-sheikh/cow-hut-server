export type IUser = {
  id: string
  name: {
    firstName: string
    lastName?: string
  }
  role: string
  phoneNumber: string
  address: string
  budget?: number
  income?: number
  password: string
}
