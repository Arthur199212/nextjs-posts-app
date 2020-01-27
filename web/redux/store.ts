import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { IN_PROD } from '../config'
import rootReducer from './reducers'

// CONSTANTS
// const SNOW_NOTIFICATION = 'SNOW_NOTIFICATION'
// const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

// interface notificationPayload {
//   status: string,
//   message: string
// }

// ACTIONS
// export const showNotification = (payload: notificationPayload) => ({
//   type: SNOW_NOTIFICATION,
//   payload
// })

// export const hideNotification = () => ({
//   type: HIDE_NOTIFICATION
// })

// REDUCER
// const initialState = {
//   show: false,
//   status: 'info', // info, error, success, warning
//   message: ''
// }

// export const notification = (state = initialState, { type, payload }: any) => {
//   switch (type) {
//     case SNOW_NOTIFICATION:
//       return {
//         show: true,
//         status: payload.status,
//         message: payload.message
//       }
//     case HIDE_NOTIFICATION:
//       return {
//         show: false,
//         status: 'info',
//         message: ''
//       }
//     default:
//       return state
//   }
// }

// const rootReducer = combineReducers({ notification })

export function configureStore (preloadedState: any) {
  const middlewareEnhancer = applyMiddleware(thunkMiddleware)

  const composedEnhancers = IN_PROD ?
    middlewareEnhancer
    : composeWithDevTools(middlewareEnhancer)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}
