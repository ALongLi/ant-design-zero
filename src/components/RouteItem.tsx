import React, { FC, Suspense } from 'react'
import { RouteProps } from 'react-router'
import FallbackLoading from './FallbackLoading'

export interface RouteItemProps extends RouteProps {
  title: string
  authorize?: boolean
}

const RouteItem: FC<RouteItemProps> = (props) => {
  if (props.title) {
    document.title = props.title
  }

  return <Suspense fallback={<FallbackLoading />}>{props.element}</Suspense>
}

export default RouteItem
