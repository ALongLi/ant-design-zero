import { message } from 'antd'
import { trimRight, queryString } from './string'
import { getAuthData } from './storage'

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

const handleErrorCode = (code: number, msg?: string) => {
  switch (code) {
    case 401:
      location.href = '/login'
      break
    case 403:
      message.error(msg || '权限不足，禁止访问')
      break
    case 404:
      message.error(msg || '资源不存在')
      break
    case 400:
      message.error(msg || '请求出错')
      break
    default:
      message.error(msg || '服务器异常')
  }
}

class Request {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = trimRight(baseUrl, '/')
  }

  send(path: string, method: HttpMethod, data: object) {
    const { accessToken } = getAuthData() || {}
    const dataInUrl = method === 'get' || method === 'delete'
    let url = /^https?:\/\//.test(path) ? path : `${this.baseUrl}/${path}`
    if (dataInUrl) {
      const qs = queryString(data)
      if (qs) {
        url += '?' + qs
      }
    }
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: dataInUrl ? undefined : JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          const result = await response.json()
          if (result.code === 0 || result.code === 200) {
            return result.data
          }
          if (result.code) {
            handleErrorCode(result.code, result.message)
            return new Promise(() => null)
          }
        }
        return Promise.reject(response)
      })
      .catch((error) => {
        if (typeof error == 'object' && error.status) {
          handleErrorCode(error.status)
        } else {
          message.error('网络异常')
        }
        throw error
      })
  }

  get(path: string, params: object) {
    return this.send(path, 'get', params)
  }

  post(path: string, data: object) {
    return this.send(path, 'post', data)
  }

  put(path: string, data: object) {
    return this.send(path, 'put', data)
  }

  patch(path: string, data: object) {
    return this.send(path, 'patch', data)
  }

  delete(path: string, params: object) {
    return this.send(path, 'delete', params)
  }
}

export default Request

export const request = new Request(import.meta.env.VITE_BASE_API_URL)
