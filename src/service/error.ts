import { http } from '@/utils/http'

export const err1 = () => {
  return http.get('err1')
}
