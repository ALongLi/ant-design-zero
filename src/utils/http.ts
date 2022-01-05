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
    if (!this.container[baseUrl]) {
      this.container[baseUrl] = new Http(baseUrl)
    }
    return this.container[baseUrl]
  }

  request<D>(url: string, config: RequestConfig = {}): Promise<D | undefined> {
    let fullUrl = /^((https?:)|\/)/.test(url) ? url : `${this.baseUrl}/${url}`
    if (config.params && Object.keys(config.params).length > 0) {
      fullUrl += '?' + queryString(config.params)
    }
    const { accessToken } = getAuthData() || {}

    return fetch(fullUrl, {
      method: 'get',
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

  get<D>(url: string, params?: object) {
    return this.request<D>(url, { method: 'get', params })
  }

  post<D>(url: string, data: object) {
    return this.request<D>(url, { method: 'post', data })
  }

  put<D>(url: string, data: object) {
    return this.request<D>(url, { method: 'put', data })
  }

  patch<D>(url: string, data: object) {
    return this.request<D>(url, { method: 'patch', data })
  }

  delete<D>(url: string, params?: object) {
    return this.request<D>(url, { method: 'delete', params })
  }
}

export default Http

export const getInstance = (baseUrl: string) => Http.getInstance(baseUrl)
