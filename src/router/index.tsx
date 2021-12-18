import React, { FC, lazy } from 'react'
import { RouteObject } from 'react-router'
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom'
import Layout from '@/components/Layout'

import RouteItem from './RouteItem'

const NotFound = lazy(() => import('@/pages/NotFound'))
const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RouteItem title="" element={<Layout />} />,
    children: [
      {
        path: '',
        element: <RouteItem title="" element={<Navigate to="/login" />} />,
      },
      {
        path: '/home',
        element: <RouteItem title="首页" element={<Home />} />,
      },
    ],
  },
  {
    path: 'login',
    element: <RouteItem title="登录" element={<Login />} />,
  },
  {
    path: '*',
    element: <RouteItem title="页面未找到" element={<NotFound />} />,
  },
]

const RouteElements: FC = () => {
  return useRoutes(routes)
}

const RenderRouter: FC = () => {
  return (
    <BrowserRouter>
      <RouteElements />
    </BrowserRouter>
  )
}

export default RenderRouter
