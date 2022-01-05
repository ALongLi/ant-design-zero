import { useRequest } from '@/hooks'
import { getInstance } from '@/utils/http'

const http = getInstance(import.meta.env.VITE_BASE_API_URL)

const login = (data: { username: string; password: string }) => {
  return http.post('token', { ...data, grantType: 'password' })
}

const refreshToken = (data: { refreshToken: string }) => {
  return http.post('token', { ...data, grantType: 'refresh_token' })
}

const useGetUserById = () => {
  const { request, state } = useRequest<UserInfo>()
  const action = (id: number) => request(http.get(`users/${id}`))
  return [action, state] as const
}

export { login, refreshToken, useGetUserById }
