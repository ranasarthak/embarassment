declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export interface JWTPayload {
  userId: string,
  iat: number
}