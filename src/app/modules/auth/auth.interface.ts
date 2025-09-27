export type ILoginUser = {
  phoneNumber: string
  password: string
}
export type ILoginUserResponse = {
  refreshToken?: string
  accessToken: string | undefined
}
export type IRefreshTokenResponse = {
  accessToken: string | undefined
}
