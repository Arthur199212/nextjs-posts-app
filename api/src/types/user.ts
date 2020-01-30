import { Document } from 'mongoose'
import { PostDocument } from './'

export interface UserDocument extends Document {
  name: string,
  email: string,
  password: string,
  avatarUrl: string,
  posts: PostDocument['_id']
  matchesPassword: (password: string) => Promise<boolean>
}
