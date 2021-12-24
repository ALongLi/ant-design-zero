import { createElement, lazy } from 'react'
import type { RouteObject } from 'react-router'
import { Navigate } from 'react-router-dom'
import RouteWrapper from '@/common/RouteWrapper'

export const menuToRoutes = (items: MenuItem[]) => {
  let result: RouteObject[] = []
  for (const item of items) {
    if (item.children) {
      result.push({
        path: item.path,
        element: <Navigate to={item.children[0].path} />,
      })
      result = result.concat(menuToRoutes(item.children))
    } else {
      result.push({
        path: item.path,
        element: (
          <RouteWrapper
            title={item.name}
            element={item.page ? createElement(lazy(item.page)) : undefined}
          />
        ),
      })
    }
  }
  return result
}
