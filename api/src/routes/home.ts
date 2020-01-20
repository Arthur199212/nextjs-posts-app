import Router from 'express'
import { auth, catchAsync } from '../middleware'
import { User } from '../models'

const router = Router()

router.get('/home', auth, catchAsync(async (req, res) => {
  const { userId } = req.session!

  const user = await User.findById(userId)

  res.json({ message: user })
}))

export default router
