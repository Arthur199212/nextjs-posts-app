import { Router } from 'express'
import { validate, registerSchema } from '../validation'
import { catchAsync } from '../middleware'
import { User } from '../models'

const router = Router()

router.post('/register', catchAsync(async (req, res) => {
  await validate(registerSchema, req.body)

  const { email, name, password } = req.body
  // TODO check if email already taken

  await User.create({
    email, name, password
  })

  // TODO send cookie

  res.json({ message: 'OK' })
}))

export default router
