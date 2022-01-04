import useAsync from './useAsync'
import { RequestError } from '@/utils/http'

const useApi = <D>() => {
  const { loading, data, run, error } = useAsync<D>()

  const api = async (api: Api, config: ApiConfig) => {
    console.log(1, error)
    await run(api.http.request(api.url, { method: api.method, ...config }))
    if (error instanceof Error) {
      console.log(2, error)
      if ((error as RequestError).handled) {
        console.log(3, error)
        return new Promise(() => null)
      } else {
        throw error
      }
    }
  }

  return {
    api,
    data,
    loading,
  }
}

export default useApi
