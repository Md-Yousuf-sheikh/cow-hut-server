import ApiError from '../../../errors/ApiError'
import { IAdmin, ILoginAdmin, IRefreshTokenResponse } from './admin.interface'
import httpStatus from 'http-status'
import { Admin } from '../admins/admin.model'
import jwt, { Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import { generateAdminId } from './admin.utils'

//
//  create user
const createAdmin = async (user: IAdmin): Promise<IAdmin | null> => {
  //  auto generate increment id
  const id = await generateAdminId()
  user.id = id ?? '0001'

  //  create
  const createdUser = await Admin.create(user)
  // Type casting to IUser
  const userResult: IAdmin | null = createdUser as unknown as IAdmin

  if (!userResult) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin!')
  }

  return userResult
}

//  Login  User
const loginAuthUser = async (payload: ILoginAdmin) => {
  const { phoneNumber, password } = payload
  //  create instance of user
  const user = new Admin()
  //  access to our instance methods
  const isUserExist = await user.isAdminExist(phoneNumber)

  //  user match
  if (!isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User dose not exist!')
  }

  const isPasswordMatch = await user.isAdminPasswordMatch(
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
  const user = new Admin()

  let verifiedToken = null
  //
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_secret as Secret,
    )

    // delete user refresh token
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalided Refresh Token!')
  }
  // checking  delete user refresh token
  const { phoneNumber, role } = verifiedToken

  // user checking is exist
  const isUserExist = await user.isAdminExist(phoneNumber)
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
  createAdmin,
}
