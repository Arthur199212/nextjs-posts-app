import { Request, Response } from 'express'
import { Post } from '../models'

interface Context {
  req: Request,
  res: Response
}

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    posts: async (parent: any, args: any, ctx: Context, info: any) => {
      // TODO auth
      const post = await Post.find({})

      return post
    },
    post: async (parent: any, args: any, ctx: Context, info: any) => {
      // TODO auth
      const { id } = args

      if (!id) throw new Error('Bad Request')

      const post = await Post.findById(id)

      if (!post) throw new Error('Bad Request')

      return post
    },
  },

  Mutation: {
    createPost: async (parent: any, args: any, ctx: Context, info: any) => {
      // TODO auth
      const { title, body } = args

      const post = await Post.create({
        title, body
      })

      return post
    },
    updatePost: async (parent: any, args: any, ctx: Context, info: any) => {
      // TODO auth
      const { id, title, body } = args

      if (!title || !body) throw new Error('Bad Request')

      const post = await Post.findOneAndUpdate(
        { _id: id },
        { title, body }
      )

      if (!post) throw new Error('Bad Request')

      return post
    },
    deletePost: async (parent: any, args: any, ctx: Context, info: any) => {
      // TODO auth
      const { id } = args

      const post = await Post.deleteOne({ _id: id })

      if (!post.deletedCount) throw new Error('Bad Request')

      return 'OK'
    },
  }
}

export default resolvers
