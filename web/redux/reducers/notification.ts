import { SNOW_NOTIFICATION, HIDE_NOTIFICATION } from '../constants'

const initialState = {
  show: false,
  status: 'info', // info, error, success, warning
  message: ''
}

export default (state = initialState, { type, payload }: any) => {
  switch (type) {
    case SNOW_NOTIFICATION:
      return {
        show: true,
        status: payload.status,
        message: payload.message
      }
    case HIDE_NOTIFICATION:
      return {
        show: false,
        status: 'info',
        message: ''
      }
    default:
      return state
  }
}
