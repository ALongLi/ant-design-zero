import React from 'react'
import { SmileOutlined, CrownOutlined, TabletOutlined } from '@ant-design/icons'

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: '欢迎',
        icon: <SmileOutlined />,
      },
      {
        path: '/admin',
        name: '管理页',
        icon: <CrownOutlined />,
        access: 'canAdmin',
        routes: [
          {
            path: '/admin/page1',
            name: '页面一',
            icon: <CrownOutlined />,
          },
          {
            path: '/admin/page2',
            name: '页面二',
            icon: <CrownOutlined />,
          },
        ],
      },
      {
        name: '列表页',
        icon: <TabletOutlined />,
        path: '/list',
        routes: [
          {
            path: '/list/sub-page',
            name: '二级菜单',
            icon: <CrownOutlined />,
            routes: [
              {
                path: 'sub-sub-page1',
                name: '列表页一',
                icon: <CrownOutlined />,
              },
              {
                path: 'sub-sub-page2',
                name: '列表页二',
                icon: <CrownOutlined />,
                component: './Welcome',
              },
            ],
          },
          {
            path: '/list/sub-page2',
            name: '列表页三',
            icon: <CrownOutlined />,
          },
        ],
      },
    ],
  },
  location: {
    pathname: '/',
  },
}
