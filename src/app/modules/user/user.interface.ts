export type IUserRole = 'seller' | 'buyer'

export type IUser = {
  id: string
  name: {
    firstName: string
    lastName?: string
  }
  role: IUserRole
  phoneNumber: string
  address: string
  budget?: number
  income?: number
  password: string
}
