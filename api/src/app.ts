import express from 'express'
import session from 'express-session'
import { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'

const createApp = (store: Store) => {
  const app = express()

  app.use(express.json())

  app.disable('x-powered-by')

  app.use(
    session({
      ...SESSION_OPTIONS,
      store
    })
  )

  app.get('/', (req, res) => {
    res.json({ message: 'OK' })
  })

  return app
}

export default createApp
