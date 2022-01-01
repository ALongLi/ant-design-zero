import { message as Message } from 'antd'
import { trimRight, queryString } from './string'
import { getAuthData, clear } from './storage'

const errorMap = {
  '400': '请求出错',
  '401': '请重新登录',
  '403': '权限不足，禁止访问',
  '404': '资源不存在',
  '500': '请重新登录',
  default: '服务器异常',
}

const handleError = (code: number, message?: string) => {
  if (code === 401) {
    clear()
    location.reload()
  }
  return Promise.reject({ message: message || errorMap[code] || errorMap['default'] })
}

interface RequestConfig {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  data?: object
  params?: object
}

class Http {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = trimRight(baseUrl, '/')
  }

  request(path: string, config: RequestConfig = { method: 'get' }) {
    let url = /^(https?|\/\/):/.test(path) ? path : `${this.baseUrl}/${path}`
    if (config.params && Object.keys(config.params).length > 0) {
      url += '?' + queryString(config.params)
    }
    const { accessToken } = getAuthData() || {}
    return fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
      body: config.data ? JSON.stringify(config.data) : undefined,
      ...config,
    })
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json()
          if (result.code === 0 || result.code === 200) {
            return result.data
          }
          if (result.code) {
            return handleError(result.code, result.message)
          }
        }
        return handleError(response.status)
      })
      .catch((error) => {
        if (typeof error == 'object' && error.message) {
          Message.error(error.message)
          throw 0
        } else {
          Message.error('请求出错')
          throw error
        }
      })
  }

  get(path: string, params: object) {
    return this.request(path, { method: 'get', params })
  }

  post(path: string, data: object) {
    return this.request(path, { method: 'post', data })
  }

  put(path: string, data: object) {
    return this.request(path, { method: 'put', data })
  }

  patch(path: string, data: object) {
    return this.request(path, { method: 'patch', data })
  }

  delete(path: string, params: object) {
    return this.request(path, { method: 'delete', params })
  }
}

export default Http

export const http = new Http(import.meta.env.VITE_BASE_API_URL)
