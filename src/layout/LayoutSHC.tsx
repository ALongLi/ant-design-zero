import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SiderMenu from './components/SiderMenu'
import UserActions from './components/UserActions'
import Logo from './components/Logo'

import './LayoutSHC.less'

const { Header, Content } = Layout

export default () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout className="app-layout app-layout-shc">
      <SiderMenu theme="dark" collapsed={collapsed} logo={<Logo />} />
      <Layout style={{ marginLeft: collapsed ? '48px' : '208px' }}>
        <Header>
          <div className="app-layout-trigger" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <div className="app-layout-navs"></div>
          <UserActions />
        </Header>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
