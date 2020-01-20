import { SessionOptions } from 'express-session'
import { IN_PROD } from '../config'

const HALF_HOUR = 1000 * 60 * 30

export const {
  SESSION_SECRET = 'secret',
  SESSION_NAME = 'sid',
  SESSION_IDEL_TIMEOUT = HALF_HOUR
} = process.env

export const SESSION_OPTIONS: SessionOptions = {
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDEL_TIMEOUT,
    secure: IN_PROD,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}
