import { http } from '@/utils/http'

export const login = (data: {
  username: string
  password: string
}): Promise<AuthData | unknown> => {
  return http.post('token', { ...data, grantType: 'password' })
}

export const refreshToken = (data: { refreshToken: string }) => {
  return http.post('token', { ...data, grantType: 'refresh_token' })
}
