import { Schema, model, Document } from 'mongoose'

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

userSchema.methods.matchesPassword = function (password: string) {
  return this.password === password
}

export const User = model<UserDocument>('User', userSchema)
