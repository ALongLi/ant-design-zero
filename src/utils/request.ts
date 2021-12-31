import { message } from 'antd'
import { trimRight, queryString } from './string'
import { getAuthData } from './storage'

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

const handleResponseError = (code: number, msg?: string) => {
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
    case 504:
    default:
      message.error(msg || '网络异常')
  }
}

class Request {
  baseUrl: string
  constructor(baseUrl: string) {
    this.baseUrl = trimRight(baseUrl, '/')
  }

  // Promise<ApiResult<TResult>>|Promise<never>
  run(path: string, method: HttpMethod, data: object) {
    const { accessToken } = getAuthData() || {}
    let url = path.startsWith('/') ? path : `${this.baseUrl}/${path}`
    if (method == 'get') {
      const qs = queryString(data)
      if (qs) {
        url += '?' + queryString(data)
      }
    }
    return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: method === 'get' ? undefined : JSON.stringify(data),
    })
      .then(async (response) => {
        response
          .json()
          .then((result) => {
            if (result.code === 0) {
              return result.data
            }
            return Promise.reject(result)
          })
          .catch((reason) => {
            message.error(reason + '')
          })
      })
      .catch((reason) => {
        console.log(111)
        if (reason.code) {
          handleResponseError(reason.code, reason.message)
        } else {
          message.error(reason)
        }
      })
  }
}

export const request = new Request(import.meta.env.VITE_BASE_API_URL)
