import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: object,
): string => {
  return jwt.sign(payload, secret, expireTime)
}

// verifiedToken
const verifiedToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelpers = {
  createToken,
  verifiedToken,
}
