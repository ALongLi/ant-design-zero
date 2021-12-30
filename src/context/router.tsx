import React, { lazy } from 'react'
import { RouteObject } from 'react-router'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { menuToRoutes } from '@/utils/router'
import RouteWrapper from '@/common/RouteWrapper'
import menu from '@/config/menu'

const Layout = lazy(() => import('@/layout/Layout'))
const Login = lazy(() => import('@/pages/Login'))

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

const RouteElements = () => useRoutes(routeObjects)

export default () => (
  <BrowserRouter>
    <RouteElements />
  </BrowserRouter>
)
