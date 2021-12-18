import React, { FC } from 'react'
import { Spin } from 'antd'

interface FallbackLoadingProps {
  tip?: string
}

const FallbackLoading: FC<FallbackLoadingProps> = ({ tip }) => {
  return <Spin tip={tip}></Spin>
}

export default FallbackLoading
