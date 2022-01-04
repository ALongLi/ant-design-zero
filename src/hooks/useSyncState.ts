import { useState } from 'react'

export default function useSyncState<S>(initialValue: S) {
  const [value, updateValue] = useState(initialValue)

  let current = value

  const get = () => current

  const set = (newValue: S) => {
    current = newValue
    updateValue(newValue)
    return current
  }

  return [get, set]
}
