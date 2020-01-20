import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: String,
  password: String
}, {
  timestamps: true
})

export default model('User', userSchema)
