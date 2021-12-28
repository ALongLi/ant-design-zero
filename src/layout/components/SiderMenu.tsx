import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu, Layout } from 'antd'
import type { MenuTheme } from 'antd'
import menu from '@/config/menu'

interface SiderMenuProps {
  theme: MenuTheme
  collapsed: boolean
  trigger: React.ReactNode
  logo?: React.ReactNode
}

export default (props: SiderMenuProps) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState(pathname)

  const subMenuKeys = getSubMenuKeys(menu)

  useEffect(() => {
    setSelectedKey(pathname)
    !props.collapsed && setOpenKeysByPath(pathname)
  }, [pathname, props.collapsed])

  function setOpenKeysByPath(path: string) {
    const openKeys = subMenuKeys.filter((x) => path.startsWith(x))
    setOpenKeys(openKeys)
  }

  function getSubMenuKeys(items: MenuItem[]) {
    let result: string[] = []
    for (const item of items.filter((x) => x.children)) {
      result.push(item.path)
      result = result.concat(getSubMenuKeys(item.children ?? []))
    }
    return result
  }

  function onOpenChange(keys: string[]) {
    const lastOpenKey = keys.find((key) => openKeys.indexOf(key) === -1)
    lastOpenKey ? setOpenKeysByPath(lastOpenKey) : setOpenKeys(keys)
  }

  function onSelect({ key }: { key: string }) {
    setSelectedKey(key)
    navigate(key)
  }

  function renderMenu(items: MenuItem[]) {
    const menuItems = items.filter((item) => !item.hide)
    return menuItems.map((item) => {
      return item.children ? (
        <Menu.SubMenu key={item.path} title={item.name} icon={item.icon}>
          {renderMenu(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item.path} icon={item.icon}>
          {item.name}
        </Menu.Item>
      )
    })
  }

  return (
    <Layout.Sider
      theme={props.theme}
      collapsible
      collapsed={props.collapsed}
      trigger={props.trigger}
      width={210}
      collapsedWidth={48}
    >
      {props.logo}
      <Menu
        mode="inline"
        theme={props.theme}
        inlineIndent={16}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[selectedKey]}
        onSelect={onSelect}
      >
        {renderMenu(menu)}
      </Menu>
    </Layout.Sider>
  )
}
