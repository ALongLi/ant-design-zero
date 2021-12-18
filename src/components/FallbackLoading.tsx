import React, { FC } from 'react'
import { Spin } from 'antd'

interface FallbackLoadingProps {
  tip?: string
}

const FallbackLoading: FC<FallbackLoadingProps> = ({ tip }) => {
  return (
    <div className="h-full d-flex jc-center ai-center">
      <Spin size="large" tip={tip}></Spin>
    </div>
  )
}

export default FallbackLoading
