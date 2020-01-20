import { Router } from 'express'
import { validate, registerSchema } from '../validation'
import { catchAsync } from '../middleware'
import { User } from '../models'
import { logIn } from '../auth'
import { guest } from '../middleware'
import { BadRequest } from '../errors'

const router = Router()

router.post('/register', guest, catchAsync(async (req, res) => {
  await validate(registerSchema, req.body)

  const { email, name, password } = req.body

  const found = await User.exists({ email })

  if (found) throw new BadRequest('Invalid email')

  const user = await User.create({
    email, name, password
  })

  logIn(req, user.id)

  res.json({ message: 'OK' })
}))

export default router
