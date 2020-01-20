import Joi from '@hapi/joi'

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(128)
    .trim()
    .required(),

  email: Joi.string()
    .email()
    .min(8)
    .max(254)
    .lowercase()
    .trim()
    .required(),
  
  password: Joi.string()
    .min(8)
    // .max()
    .regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
    .message('"{#label}" must contain one uppercase letter, one lowercase letter, and one digit')
    .required(),

  passwordConfirmation: Joi.valid(Joi.ref('password'))
})
