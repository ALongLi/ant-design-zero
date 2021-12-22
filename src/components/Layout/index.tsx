import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SiderMenu from './SiderMenu'
import UserAction from './UserAction'

import styles from './.module.less'

const { Header, Content, Sider } = Layout

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="app-layout">
      <Header>
        <div className={styles.logo} />
        <UserAction />
      </Header>

      <Layout>
        <Sider
          theme="light"
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          width={208}
          collapsedWidth={48}
        >
          <SiderMenu />
        </Sider>
        <Content style={{ marginLeft: collapsed ? '48px' : '208px' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
