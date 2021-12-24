import React, { lazy } from 'react'
import ReactDOM from 'react-dom'
import { RouteObject } from 'react-router'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import RouteWrapper from '@/common/RouteWrapper'
import menu from '@/config/menu'
import { menuToRoutes } from '@/utils/router'

import './styles/index.less'

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

ReactDOM.render(
  <BrowserRouter>
    <RouteElements />
  </BrowserRouter>,
  document.getElementById('root')
)
