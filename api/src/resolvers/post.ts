import { Request, Response } from 'express'
import { Post, User } from '../models'
import { isPostAuthor } from '../auth'

interface Context {
  req: Request,
  res: Response
}

export default {
  Query: {
    posts: async (parent: any, args: any, { req, res }: Context, info: any) => {
      const post = await Post.find({})

      return post
    },
    post: async (parent: any, args: any, ctx: Context, info: any) => {
      // TODO pagination (with skip & limit methods)

      const { id } = args

      if (!id) throw new Error('Bad Request')

      const post = await Post.findById(id)

      if (!post) throw new Error('Bad Request')

      return post
    },
  },

  Mutation: {
    createPost: async (parent: any, args: any, { req, res }: Context, info: any) => {
      const { title, body, imageUrl } = args

      if (!title || !body) throw new Error('Bad Request')

      const { userId } = req.session!

      const postUrl = imageUrl ? imageUrl : `https://picsum.photos/900/500?random=${Math.ceil(Math.random()*100)}`

      const post = await Post.create({
        title, body, user: userId, imageUrl: postUrl
      })

      await User.updateOne({ _id: { '$in': userId } }, {
        $push: {
          posts: post
        }
      })

      return post
    },
    updatePost: async (parent: any, args: any, { req, res }: Context, info: any) => {
      const { id, title, body, imageUrl } = args

      if (!title || !body || !imageUrl) throw new Error('Bad Request')

      await isPostAuthor(req, id)

      const post = await Post.findOneAndUpdate(
        { _id: id },
        { title, body, imageUrl }
      )

      if (!post) throw new Error('Bad Request')

      return await Post.findById(id)
    },
    deletePost: async (parent: any, args: any, { req, res }: Context, info: any) => {
      const { id } = args

      await isPostAuthor(req, id)

      const post = await Post.deleteOne({ _id: id })

      if (!post.deletedCount) throw new Error('Bad Request')

      return 'OK'
    },
  },

  Post: {
    user: async (post: any, args: any, contex: Context, info: any) => {
      return (await post.populate('user').execPopulate()).user
    }
  }
}
