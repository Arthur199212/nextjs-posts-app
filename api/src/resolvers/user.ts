import { Request, Response } from 'express'
import { User } from '../models'

interface Context {
  req: Request,
  res: Response
}

export default {
  Query: {
    me: async (parent: any, args: any, { req, res }: Context, info: any) => {
      const { userId } = req.session!

      return await User.findById(userId)
    },
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
