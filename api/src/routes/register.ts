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

  const { email, name, avatarUrl, password } = req.body

  const found = await User.exists({ email })

  if (found) throw new BadRequest('Invalid email')

  const userAvatarUrl = avatarUrl ?
    avatarUrl
    : `https://i.pravatar.cc/150?u=${Math.ceil(Math.random()*50)}`

  const user = await User.create({
    email, name, password, avatarUrl: userAvatarUrl
  })

  logIn(req, user.id)

  res.json({ message: 'OK', user: {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl
    }
  })
}))

export default router
