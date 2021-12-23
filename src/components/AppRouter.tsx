import React, { lazy } from 'react'
import { RouteObject } from 'react-router'
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import menu from '$/src/config/menu'
import RouteWrapper from '@/components/RouteWrapper'

const Layout = lazy(() => import('@/components/Layout'))
const Login = lazy(() => import('@/pages/Login'))

const menuToRoutes = (items: MenuItem[]) => {
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
    children: menuToRoutes(menu),
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
