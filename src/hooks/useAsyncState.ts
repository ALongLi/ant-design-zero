import { useState } from 'react'

const useAsyncState = <S>(initialState: S): [S, (s: S) => Promise<S>] => {
  const [state, setState] = useState(initialState)

  const setStateAsync = (newState: S): Promise<S> =>
    new Promise((resolve) => {
      setState(() => {
        resolve(newState)
        return newState
      })
    })

  return [state, setStateAsync]
}

export default useAsyncState
