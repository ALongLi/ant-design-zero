import { request } from '@/utils/request'

export const login = (data: { username: string; password: string }) => {
  return request.post('token', { ...data, grantType: 'password' })
}

export const refreshToken = (data: { refreshToken: string }) => {
  return request.post('token', { ...data, grantType: 'refresh_token' })
}

export const logout = () => Promise.resolve()
