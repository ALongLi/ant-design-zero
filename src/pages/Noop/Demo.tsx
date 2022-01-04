import { useEffect } from 'react'
import { Button, message } from 'antd'
import { useApi } from '@/hooks'
import { ERR1 } from '@/api'

export default () => {
  const { api, data, loading } = useApi()
  const handleErr1 = async () => {
    // http.get('err1')
    await api(ERR1, {})
    console.log('err1:', data)
  }
  useEffect(() => {
    if (loading) {
      message.loading('正在处理……', 1)
    }
  }, [loading])
  return (
    <div>
      <Button onClick={handleErr1}>触发错误请求</Button>
    </div>
  )
}
