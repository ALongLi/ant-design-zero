import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import SiderMenu from './components/SiderMenu'
import UserActions from './components/UserActions'
import Logo from './components/Logo'

import './Layout.less'

export default ({ type }: { type: LayoutType }) => {
  const [collapsed, setCollapsed] = useState(false)

  const Trigger = () => (
    <div className="app-layout-trigger" onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    </div>
  )

  const HeaderNavs = () => <div className="app-layout-navs"></div>

  const Content = () => (
    <Layout.Content>
      <Outlet />
    </Layout.Content>
  )

  const LayoutHSC = (
    <Layout className="app-layout app-layout-hsc">
      <Layout.Header>
        <Logo />
        <HeaderNavs />
        <UserActions />
      </Layout.Header>
      <Layout style={{ marginLeft: collapsed ? '48px' : '210px' }}>
        <SiderMenu theme="light" collapsed={collapsed} trigger={<Trigger />} />
        <Content />
      </Layout>
    </Layout>
  )

  const LayoutSHC = (
    <Layout className="app-layout app-layout-shc">
      <SiderMenu theme="dark" collapsed={collapsed} logo={<Logo />} trigger={null} />
      <Layout style={{ marginLeft: collapsed ? '48px' : '210px' }}>
        <Layout.Header style={{ width: `calc(100% - ${collapsed ? 48 : 210}px)` }}>
          <Trigger />
          <HeaderNavs />
          <UserActions />
        </Layout.Header>
        <Content />
      </Layout>
    </Layout>
  )

  const LayoutDefault = LayoutHSC

  return type === 'HSC' ? LayoutHSC : type === 'SHC' ? LayoutSHC : LayoutDefault
}
