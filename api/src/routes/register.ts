import { Router } from 'express'
import { validate, registerSchema } from '../validation'
import { catchAsync } from '../middleware'
import { User } from '../models'
import { logIn } from '../auth'

const router = Router()

router.post('/register', catchAsync(async (req, res) => {
  await validate(registerSchema, req.body)

  const { email, name, password } = req.body
  // TODO check if email already taken

  const user = await User.create({
    email, name, password
  })

  logIn(req, user.id)

  res.json({ message: 'OK' })
}))

export default router
