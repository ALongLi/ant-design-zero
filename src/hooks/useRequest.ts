import useAsync from './useAsync'
import { RequestError } from '@/utils/http'

const useReqeust = <D>(): {
  request: (promise: Promise<D | undefined>) => Promise<D | undefined>
  state: AsyncState<D>
} => {
  const { run, ...state } = useAsync<D>()

  const request = (promise: Promise<D | undefined>): Promise<D | undefined> => {
    return run(promise).then((result) => {
      if (result.error) {
        if ((result.error as RequestError).handled) {
          return new Promise(() => null)
        }
        throw result.error
      }
      return result.data
    })
  }

  return { request, state }
}

export default useReqeust
