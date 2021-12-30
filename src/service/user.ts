import { message } from 'antd'

export const login = (data: { username: string; password: string }) => {
  return fetch(`${import.meta.env.VITE_BASE_API_URL}token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, grantType: 'password' }),
  }).then(async (response) => {
    const result = await response.json()
    if (result.code === 0) {
      return result.data
    } else {
      message.error(result.message)
      return Promise.reject(result)
    }
  })
}

export const refreshToken = (data: { refreshToken: string }) => {
  return fetch(`${import.meta.env.VITE_BASE_API_URL}token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...data, grantType: 'refresh_token' }),
  }).then(async (response) => {
    const result = await response.json()
    if (result.code === 0) {
      return result.data
    } else {
      return Promise.reject(result)
    }
  })
}

export const getUserInfo = () => {
  return fetch(`${import.meta.env.VITE_BASE_API_URL}user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = () => Promise.resolve()
