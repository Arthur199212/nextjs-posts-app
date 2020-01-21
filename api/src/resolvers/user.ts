import { Request, Response } from 'express'
import { User } from '../models'

interface Context {
  req: Request,
  res: Response
}

const resolvers = {
  Query: {
    users: async (parent: any, args: any, contex: Context, info: any) => {
      const users = await User.find({})

      console.log(users)

      return users
    }
  }
}

export default resolvers
