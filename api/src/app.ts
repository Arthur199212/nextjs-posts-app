import express from 'express'
import cors from 'cors'
import session from 'express-session'
import { Store } from 'express-session'
import cookieParser from 'cookie-parser'
import { ApolloServer } from 'apollo-server-express'
import { SESSION_OPTIONS, APOLLO_OPTIONS } from './config'
import { register, login, home } from './routes'
import { notFound, serverError } from './middleware'
import typeDefs from './typeDefs'
import resolvers from './resolvers'
import schemaDirectives from './directives'

const createApp = (store: Store) => {
  const app = express()

  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
  
  app.use(express.json())

  app.disable('x-powered-by')

  app.use(session({ ...SESSION_OPTIONS, store }))

  app.use(cookieParser())

  app.use(home)

  app.use(register)

  app.use(login)

  // app.use(notFound)
  
  app.use(serverError)

  const server = new ApolloServer({
    ...APOLLO_OPTIONS,
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({ res, req }),
    schemaDirectives
  })

  server.applyMiddleware({ app, cors: false })

  return { app, server }
}

export default createApp
