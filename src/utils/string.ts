export function trimLeft(str: string, char: string) {
  while (str.charAt(0) == char) {
    str = str.substring(1)
  }
  return str
}

export function trimRight(str: string, char: string) {
  while (str.charAt(str.length - 1) == char) {
    str = str.substring(0, str.length - 1)
  }
  return str
}

export function queryString(params: object | string) {
  if (!params) return ''
  if (typeof params != 'object') return params
  return Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    })
    .join('&')
}
