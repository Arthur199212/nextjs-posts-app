import { Router } from 'express'
import { validate, registerSchema } from '../validation'
import { catchAsync } from '../middleware'

const router = Router()

router.post('/register', catchAsync(async (req, res) => {
  await validate(registerSchema, req.body)

  // TODO create user

  // TODO send cookie

  res.json({ message: 'OK' })
}))

export default router
