import Joi from '@hapi/joi'

const name = Joi.string()
  .min(3)
  .max(128)
  .trim()
  .required()

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .lowercase()
  .trim()
  .required()

const password = Joi.string()
  .min(8)
  // max()
  .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
  .message(
    '"{#label}" must contain one uppercase letter, one lowercase letter, and one digit'
  )
  .required()

const passwordConfirmation = Joi.valid(Joi.ref('password'))

export const registerSchema = Joi.object({
  name,
  email,
  password,
  passwordConfirmation
})

export const loginSchema = Joi.object({
  email,
  password
})
