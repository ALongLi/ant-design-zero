import React from 'react'
import { Spin } from 'antd'

const FallbackLoading = ({ tip }: { tip?: string }) => {
  const style = { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }
  return (
    <div style={style}>
      <Spin size="large" tip={tip}></Spin>
    </div>
  )
}

export default FallbackLoading
