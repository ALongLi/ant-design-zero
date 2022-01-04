import useAsync from './useAsync'
import { RequestError } from '@/utils/http'

const useApi = <D>() => {
  const { loading, data, run } = useAsync<D>()

  const api = async (api: Api, config: ApiConfig): Promise<D | Error | undefined> => {
    const result = await run(api.http.request(api.url, { method: api.method, ...config }))
    if (result instanceof Error) {
      if ((result as RequestError).handled) {
        return new Promise(() => null)
      } else {
        throw result as Error
      }
    }
    return result
  }

  return {
    api,
    data,
    loading,
  }
}

export default useApi
