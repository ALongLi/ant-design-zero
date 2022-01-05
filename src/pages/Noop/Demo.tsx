import { useEffect } from 'react'
import { Button, message } from 'antd'
import { useGetUserById } from '@/service/user'

export default () => {
  const [getUserById, getUserByIdState] = useGetUserById()
  const handleErr1 = () => {
    getUserById(1)
  }
  useEffect(() => {
    console.log('getUserByIdState:', getUserByIdState)
    if (getUserByIdState.loading) {
      message.loading('正在处理……', 1)
    }
  }, [getUserByIdState])
  return (
    <div>
      <Button onClick={handleErr1}>触发请求</Button>
    </div>
  )
}
