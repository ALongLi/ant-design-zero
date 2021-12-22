import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import type { BasicLayoutProps } from '@ant-design/pro-layout'

import ProLayout, { ProBreadcrumb } from '@ant-design/pro-layout'
import defaultProps from './_defaultProps'

import styles from './.module.less'

export default () => {
  const [pathname, setPathname] = useState('/admin/sub-page1')
  const [collapsed, setCollapsed] = useState(false)

  const props: BasicLayoutProps = {
    ...defaultProps,
    location: {
      pathname,
    },
    // navTheme: 'light',
    collapsed,
    fixSiderbar: true,
    collapsedButtonRender: false,
    menuItemRender: (item, dom) => (
      <a
        onClick={() => {
          setPathname(item.path || '/welcome')
        }}
      >
        {dom}
      </a>
    ),
  }

  return (
    <ProLayout
      {...props}
      onCollapse={setCollapsed}
      headerContentRender={() => {
        return (
          <div className={styles.topbar}>
            <span className={styles.action} onClick={() => setCollapsed(!collapsed)}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <ProBreadcrumb />
          </div>
        )
      }}
    >
      <Outlet />
    </ProLayout>
  )
}
