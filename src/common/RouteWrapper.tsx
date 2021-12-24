import React, { FC, Suspense } from 'react'
import { RouteProps } from 'react-router'
import FallbackLoading from './FallbackLoading'

export interface RouteWrapperProps extends RouteProps {
  title?: string
  permission?: boolean
}

const RouteWrapper: FC<RouteWrapperProps> = (props) => {
  if (props.title) {
    document.title = `${props.title} - ${import.meta.env.VITE_APP_NAME}`
  }

  return <Suspense fallback={<FallbackLoading />}>{props.element}</Suspense>
}

export default RouteWrapper
