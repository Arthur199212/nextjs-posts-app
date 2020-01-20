import { ObjectSchema } from '@hapi/joi'

export const validate = async (schema: ObjectSchema, args: any) => {
  try {
    await schema.validateAsync(args, { abortEarly: false })
  } catch (err) {
    throw new Error('Invalid input')
  }
}
