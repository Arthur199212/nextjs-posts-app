import mongoose from 'mongoose'
import session from 'express-session'
import Redis from 'ioredis'
import connectRedis from 'connect-redis'
import { APP_PORT, MONGO_URI, MONGO_OPTIONS, REDIS_OPTIONS } from './config'
import createApp from './app'

;(async () => {
  try {
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS)

    const RedisStore = connectRedis(session)

    const client = new Redis(REDIS_OPTIONS)

    const store = new RedisStore({ client })

    const { app, server } = createApp(store)

    app.listen(APP_PORT, () =>
      console.log(
        `Auth server at http://localhost:${APP_PORT}/`,
        `\nGraphQL server at http://localhost:4000${server.graphqlPath}`
      )
    )
  } catch (err) {
    console.log(err)
  }
})()
