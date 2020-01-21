import { Request, Response } from 'express'
import { SESSION_NAME } from './config'
import { Unatherized } from './errors'

export const logIn = (req: Request, userId: string) =>
  req.session!.userId = userId

export const isLoggedIn = (req: Request) =>
  req.session!.userId

export const logOut = (req: Request, res: Response) => 
  new Promise((resolve, reject) => {
    req.session!.destroy((err: Error) => {
      if (err) reject(err)

      res.clearCookie(SESSION_NAME)

      resolve()
    })
  })

export const ensureLoggedIn = (req: Request) => {
  if (!isLoggedIn(req)) {
    throw new Unatherized('You must be logged in.')
  }
}

export const ensureLoggedOut = (req: Request) => {
  if (isLoggedIn(req)) {
    throw new Unatherized('You are already logged in.')
  }
}
