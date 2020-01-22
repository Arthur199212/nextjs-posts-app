import { loginRequestData, registerRequestData } from '../types'
import { LOGIN_URL, REGISTER_URL } from '../config'

export const logIn = async (data: loginRequestData) => {
  try {
    const res = await fetch(LOGIN_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const register = async (data: registerRequestData) => {
  try {
    const res = await fetch(REGISTER_URL, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}
