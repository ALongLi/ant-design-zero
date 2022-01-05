import { useState } from 'react'

export default function useSyncState<S>(initialValue: S) {
  const [value, setValue] = useState(initialValue)

  let current = value

  const get = () => current

  const set = (newValue: S) => {
    current = newValue
    setValue(newValue)
    return current
  }

  return [get, set]
}
