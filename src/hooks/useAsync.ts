import useAsyncState from './useAsyncState'

interface State<D> {
  loading: boolean
  data?: D
  error?: Error
}

const useAsync = <D>() => {
  const [state, setState] = useAsyncState<State<D>>({
    loading: false,
  })

  const run = async (promise: Promise<D | undefined>) => {
    if (!promise || !promise.then) {
      throw new Error('参数必须是 Promise 类型')
    }
    try {
      await setState({ loading: true })
      const data = await promise
      await setState({ data, loading: false })
    } catch (error) {
      console.log(0, error)
      await setState({ error: error as Error, loading: false })
      console.log(10, state.error)
    }
  }

  return {
    run,
    ...state,
  }
}

export default useAsync
