import { lazy, createElement } from 'react'
import { RouteObject } from 'react-router'
import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom'
import RouteWrapper from '@/common/RouteWrapper'
import menu from '@/config/menu'

const Layout = lazy(() => import('@/layout/Layout'))
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
            element={item.page ? createElement(lazy(item.page)) : undefined}
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
    element: <RouteWrapper element={<Layout type="SHC" />} />,
    children: menuToRoutes(menu),
  },
  {
    path: 'login',
    element: <RouteWrapper title="登录" element={<Login />} />,
  },
]

export const Routes = () => useRoutes(routeObjects)

export const Router = BrowserRouter
