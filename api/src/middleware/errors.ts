import { RequestHandler, Request, Response, NextFunction,  } from 'express'

export const catchAsync = (handler: RequestHandler) => 
  (...args: [Request, Response, NextFunction]) => handler(...args).catch(args[2])

export const notFound = (req: Request, res: Response, next: NextFunction) =>
  res.status(404).json({ message: 'Not Found' })

export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal Server Error' })
}
