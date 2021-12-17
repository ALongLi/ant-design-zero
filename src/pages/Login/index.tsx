import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'

export default () => {
  const navigate = useNavigate()
  return (
    <Button type="primary" onClick={() => navigate('/home')}>
      登录
    </Button>
  )
}
