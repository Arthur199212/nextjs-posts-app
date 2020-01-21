import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: String,
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

postSchema.set('toJSON', {
  transform: (doc, { __v, _id, ...rest }, options) => ({
    ...rest,
    id: _id
  })
})

export const Post = model('Post', postSchema)
