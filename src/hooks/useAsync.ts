import { useState } from 'react'

const useAsync = <D>() => {
  const [state, setState] = useState<AsyncState<D>>({
    loading: false,
  })

  const run = (promise: Promise<D | undefined>): Promise<AsyncResult<D>> => {
    if (!promise || !promise.then) {
      throw new Error('参数必须是 Promise 类型')
    }

    setState({ loading: true })

    return promise
      .then((data) => {
        setState({ data, loading: false })
        return { data }
      })
      .catch((error) => {
        setState({ error, loading: false })
        return { error }
      })
  }

  return { run, ...state }
}

export default useAsync
