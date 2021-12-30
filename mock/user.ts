import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/token',
    method: 'post',
    response: (payload: {
      username: string
      password: string
      refreshToken: string
      grantType: 'password' | 'refresh_token'
    }) => {
      const { username, password } = payload
      if (!username || !password || username.toLowerCase() !== 'admin' || password != 'admin') {
        return {
          code: 400,
          message: '用户名或密码错误',
        }
      }
      return {
        code: 0,
        data: {
          accessToken: 'fjkdslajfdskalfjkdsafjdksla',
          expiresIn: 3600,
          refreshToken: '',
          userInfo: {
            id: 1,
            name: 'Admin',
            roles: ['admin'],
            avatar: '',
          },
        },
      }
    },
  },
] as MockMethod[]
