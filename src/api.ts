import Http from '@/utils/http'

const main = Http.getInstance(import.meta.env.VITE_BASE_API_URL)

export const TOKEN: Api = { http: main, method: 'post', url: 'token' }
export const REFRESH_TOKEN: Api = { http: main, method: 'post', url: 'refresh_token' }
export const ERR1: Api = { http: main, method: 'get', url: 'err1' }
