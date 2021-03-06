import { Schema, model } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { BCRYPT_WORK_FACTOR } from '../config/auth'
import { UserDocument } from '../types'

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatarUrl: String,
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
}, {
  timestamps: true
})

userSchema.pre<UserDocument>('save', async function () {
  if (this.isModified('password')) {
    this.password = await hash(this.password, BCRYPT_WORK_FACTOR)
  }
})

userSchema.methods.matchesPassword = function (password: string) {
  return compare(password, this.password)
}

userSchema.set('toJSON', {
  transform: (doc, { __v, password, ...rest }, options) => rest
})

export const User = model<UserDocument>('User', userSchema)
