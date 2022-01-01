import { useState } from 'react'
import { http, RequestConfig } from '@/utils/http'

interface State<D> {
  loading: boolean
  data?: D
  error?: Error
}

const useHttp = <D>() => {
  const [state, setState] = useState<State<D>>({
    loading: false,
  })

  const request = (path: string, config: RequestConfig) => {
    setState({ loading: true })
    return http
      .request<D>(path, config)
      .then((data) => {
        setState({ data, loading: false })
        return data
      })
      .finally(() => {
        setState({ loading: false })
      })
  }

  const get = (path: string, params?: object) => request(path, { method: 'get', params })
  const post = (path: string, data: object) => request(path, { method: 'post', data })
  const put = (path: string, data: object) => request(path, { method: 'put', data })
  const patch = (path: string, data: object) => request(path, { method: 'patch', data })
  const del = (path: string, params?: object) => request(path, { method: 'delete', params })

  return {
    get,
    post,
    put,
    patch,
    del,
    ...state,
  }
}

export default useHttp
