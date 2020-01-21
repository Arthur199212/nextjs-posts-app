import { Request, Response } from 'express'
import { User } from '../models'

interface Context {
  req: Request,
  res: Response
}

export default {
  Query: {
    users: async (parent: any, args: any, contex: Context, info: any) => {
      const users = await User.find({})

      return users
    }
  },

  User: {
    posts: async (user: any, args: any, contex: Context, info: any) => {
      return (await user.populate('posts').execPopulate()).posts
    }
  }
}
