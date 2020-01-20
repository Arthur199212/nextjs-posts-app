import { Schema, model, Document } from 'mongoose'
import { hash, compare } from 'bcryptjs'
import { BCRYPT_WORK_FACTOR } from '../config/auth'

interface UserDocument extends Document {
  email: string,
  password: string,
  matchesPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
  email: String,
  password: String
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

export const User = model<UserDocument>('User', userSchema)
