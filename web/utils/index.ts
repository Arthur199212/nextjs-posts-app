import { loginRequestDocument, registerRequestDocument } from '../types'
import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, PAGINATION_BUTTONS_ON_PAGE } from '../config'

export const logIn = async (data: loginRequestDocument) => {
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

export const register = async (data: registerRequestDocument) => {
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

export const logOut = async () => {
  try {
    const res = await fetch(LOGOUT_URL, {
      method: 'POST',
      credentials: 'include'
    })

    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const pagination = (page: number, count: number) => {
  const arr = new Array(count).fill('').map((_, i) => i)

  let resArr

  if (!page) resArr = arr.slice(0, PAGINATION_BUTTONS_ON_PAGE)

  resArr = page < PAGINATION_BUTTONS_ON_PAGE - 1 ?
    arr.slice(0, PAGINATION_BUTTONS_ON_PAGE)
    : page > count - PAGINATION_BUTTONS_ON_PAGE ?
      arr.slice(-PAGINATION_BUTTONS_ON_PAGE)
      : arr.slice(page - 1, page + PAGINATION_BUTTONS_ON_PAGE - 1)

  resArr.indexOf(page)

  return {
    pagesList: resArr,
    selectedTab: resArr.indexOf(page)
  }
}
