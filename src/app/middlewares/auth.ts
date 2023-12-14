import e, { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get access token
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'UNAUTHORIZED')
      }

      //  token verify
      let verifiedUser = null
      try {
        verifiedUser = jwtHelpers.verifiedToken(
          token,
          config.jwt.secret as Secret,
        )
      } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalided  Token!')
      }
      //
      req.user = verifiedUser

      //  check to role to access or not data
      if (
        requiredRoles?.length &&
        !requiredRoles.includes(verifiedUser?.role)
      ) {
        throw new ApiError(httpStatus.FORBIDDEN, 'FORBIDDEN')
      }
      // continue..... next
      next()
    } catch (error) {
      next(error)
    }
  }

export default auth
// required
