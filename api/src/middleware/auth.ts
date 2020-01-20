import { Request, Response, NextFunction } from 'express'
import { Unatherized } from '../errors'
import { isLoggedIn } from '../auth'

export const guest = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) {
    return next(new Unatherized('You are already logged in.'))
  }

  next()
}
