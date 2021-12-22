import React, { lazy } from 'react'
import { RouteObject } from 'react-router'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import routes from '@/config/routes'
import RouteWrapper from '@/components/RouteWrapper'

const Layout = lazy(() => import('@/components/Layout'))
const Login = lazy(() => import('@/pages/Login'))

const mapRouteObjects = (items: RouteItem[]) => {
  let result: RouteObject[] = []
  for (const item of items) {
    if (item.children) {
      result = result.concat(mapRouteObjects(item.children))
    } else {
      result.push({
        path: item.path,
        element: (
          <RouteWrapper
            title={item.name}
            element={item.page ? React.createElement(lazy(item.page)) : undefined}
          />
        ),
      })
    }
  }
  return result
}

const routeObjects: RouteObject[] = [
  {
    path: '/',
    element: <RouteWrapper element={<Layout />} />,
    children: mapRouteObjects(routes),
  },
  {
    path: 'login',
    element: <RouteWrapper title="登录" element={<Login />} />,
  },
]

const Router = () => {
  return <BrowserRouter>{React.createElement(() => useRoutes(routeObjects))}</BrowserRouter>
}

export default Router
