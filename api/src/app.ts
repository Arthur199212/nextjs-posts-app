import express from 'express'
import session from 'express-session'
import { Store } from 'express-session'
import { SESSION_OPTIONS } from './config'
import { register, login, home } from './routes'
import { notFound, serverError } from './middleware'

const createApp = (store: Store) => {
  const app = express()

  app.use(express.json())

  app.disable('x-powered-by')

  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use(home)

  app.use(register)

  app.use(login)

  app.use(notFound)
  
  app.use(serverError)

  return app
}

export default createApp
