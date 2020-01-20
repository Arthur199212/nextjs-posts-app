import { Request } from 'express'

export const logIn = (req: Request, userId: string) =>
  req.session!.userId = userId

export const isLoggedIn = (req: Request) =>
  req.session!.userId
