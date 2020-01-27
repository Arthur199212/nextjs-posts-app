import { Document } from 'mongoose'
import { PostDocument } from './'

export interface UserDocument extends Document {
  name: string,
  email: string,
  password: string,
  posts: PostDocument['_id']
  matchesPassword: (password: string) => Promise<boolean>
}
