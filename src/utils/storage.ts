const cache = {}

const authKey = '__auth__'

export const getAuthData = (): AuthResult | null => {
  if (cache[authKey]) {
    return cache[authKey]
  }
  const text = window.localStorage.getItem(authKey)
  if (text) {
    cache[authKey] = JSON.parse(text)
    return cache[authKey]
  }
  return null
}

export const setAuthData = (data: AuthResult | null) => {
  if (!data) {
    cache[authKey] = null
    window.localStorage.removeItem(authKey)
    return
  }
  cache[authKey] = data
  window.localStorage.setItem(authKey, JSON.stringify(data))
}
