import { useEffect } from 'react'
import { Button, message } from 'antd'
import useHttp from '@/hooks/useHttp'

export default () => {
  const { loading, get } = useHttp()
  const handleErr1 = async () => {
    // http.get('err1')
    const data = await get('err1')
    console.log(data)
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
