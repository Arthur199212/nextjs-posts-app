import { SNOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants'

interface notificationPayload {
  status: string,
  message: string
} 

export const showNotification = (payload: notificationPayload) => ({
  type: SNOW_NOTIFICATION,
  payload
})

export const hideNotification = () => ({
  type: HIDE_NOTIFICATION
})