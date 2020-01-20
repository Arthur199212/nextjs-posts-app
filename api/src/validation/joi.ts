import { ObjectSchema } from '@hapi/joi'
import { BadRequest } from '../errors'

export const validate = async (schema: ObjectSchema, args: any) => {
  try {
    await schema.validateAsync(args, { abortEarly: false })
  } catch (err) {
    throw new BadRequest(err)
  }
}
