import React from 'react'
import { SmileOutlined, CrownOutlined, TabletOutlined } from '@ant-design/icons'

const routes: RouteItem[] = [
  {
    name: '首页',
    path: '/',
    icon: <SmileOutlined />,
    page: () => import('@/pages/Home'),
  },
  {
    name: '页面二',
    path: '/page1',
    icon: <CrownOutlined />,
    page: () => import('@/pages/Noop/Demo'),
  },
  {
    name: '二级菜单',
    path: '/menu2',
    icon: <TabletOutlined />,
    page: () => import('@/pages/Noop/Demo'),
    children: [
      {
        name: '三级菜单',
        path: '/menu2/menu3',
        children: [
          {
            name: '页面三',
            path: '/menu2/menu3/page3',
            page: () => import('@/pages/Noop/Demo'),
          },
        ],
      },
      {
        name: '页面四',
        path: '/menu2/page4',
        page: () => import('@/pages/Noop/Demo'),
      },
    ],
  },
]

export default routes
