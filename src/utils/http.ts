import { message as Message } from 'antd'
import { trimRight, queryString } from './string'
import { getAuthData, clear } from './storage'

export class RequestError extends Error {
  handled: boolean
  constructor(message?: string, handled = true) {
    super(message)
    this.name = 'RequestError'
    this.handled = handled
  }
}

const errorMap = {
  '400': '请求出错',
  '401': '请重新登录',
  '403': '权限不足，禁止访问',
  '404': '资源不存在',
  '500': '请重新登录',
  default: '服务器异常',
}

const handleError = (code: number, message?: string | undefined) => {
  if (code === 401) {
    clear()
    location.reload()
  }
  return new RequestError(message || errorMap[code] || errorMap['default'])
}

class Http implements IHttp {
  private baseUrl: string
  private constructor(baseUrl: string) {
    this.baseUrl = trimRight(baseUrl, '/')
  }

  private static container: Record<string, Http> = {}
  static getInstance(baseUrl: string): Http {
    if (this.container[baseUrl]) {
      return this.container[baseUrl]
    }
    return new Http(baseUrl)
  }

  request<D>(path: string, config: RequestConfig = {}): Promise<D | undefined> {
    let url = /^(https?:)|\//.test(path) ? path : `${this.baseUrl}/${path}`
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
          const result: ApiResult<D> = await response.json()
          if (result.code === 0 || result.code === 200) {
            return result.data
          }
          if (result.code) {
            throw handleError(result.code, result.message)
          }
        }
        throw handleError(response.status)
      })
      .catch((e) => {
        Message.error(e instanceof RequestError ? e.message : '错误请求')
        throw e
      })
  }

  get<D>(path: string, params?: object) {
    return this.request<D>(path, { method: 'get', params })
  }

  post<D>(path: string, data: object) {
    return this.request<D>(path, { method: 'post', data })
  }

  put<D>(path: string, data: object) {
    return this.request<D>(path, { method: 'put', data })
  }

  patch<D>(path: string, data: object) {
    return this.request<D>(path, { method: 'patch', data })
  }

  delete<D>(path: string, params?: object) {
    return this.request<D>(path, { method: 'delete', params })
  }
}

export default Http

export const http = Http.getInstance(import.meta.env.VITE_BASE_API_URL)
