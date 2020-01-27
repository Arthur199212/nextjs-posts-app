const {
  NODE_ENV = 'developnent'
} = process.env

export const IN_PROD = NODE_ENV === 'production'
