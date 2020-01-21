import { IN_PROD } from './app'

export const APOLLO_OPTIONS = {
  playground: IN_PROD
    ? false
    : {
        settings: {
          'request.credentials': 'include'
        }
      }
}
