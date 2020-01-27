import { Document } from 'mongoose'
import { UserDocument } from './'

export interface PostDocument extends Document {
  title: string,
  body: string,
  user: UserDocument['_id']
}
