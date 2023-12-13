import ApiError from '../../../errors/ApiError'
import { ILoginUser, IRefreshTokenResponse } from './auth.interface'
import httpStatus from 'http-status'
import { User } from '../user/user.model'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'

//  Login  User
const loginAuthUser = async (payload: ILoginUser) => {
  const { phoneNumber, password } = payload
  //  create instance of user
  const user = new User()
  //  access to our instance methods
  const isUserExist = await user.isUserExist(phoneNumber)

  //  user match
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User dose not exist!')
  }

  const isPasswordMatch = await user.isUserPasswordMatch(
    password,
    isUserExist?.password,
  )

  //  match password
  if (!isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password dose not match!')
  }

  const { role } = isUserExist

  console.log('isUserExist', isUserExist)

  // access Token
  const accessToken = jwtHelpers.createToken(
    {
      phoneNumber,
      role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in as string,
    },
  )
  // refresh Token
  const refreshToken = jwtHelpers.createToken(
    {
      phoneNumber,
      role,
    },
    config.jwt.refresh_secret as Secret,
    {
      expiresIn: config.jwt.refresh_expires_in as string,
    },
  )

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}

// refresh Token
const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  const user = new User()
  //
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_secret as Secret,
    )

    // delete user refresh token
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalided refresh token!')
  }
  // checking  delete user refresh token
  const { phoneNumber, role } = verifiedToken

  // user checking is exist
  const isUserExist = await user.isUserExist(phoneNumber)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User dose not exist!')
  }
  // generate new access token
  const newAccessToken = jwtHelpers.createToken(
    {
      phoneNumber,
      role,
    },
    config.jwt.secret as Secret,
    {
      expiresIn: config.jwt.expires_in as string,
    },
  )

  return {
    accessToken: newAccessToken,
  }
}

export default {
  loginAuthUser,
  refreshToken,
}
