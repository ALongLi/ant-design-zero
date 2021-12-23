import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import menu from '@/config/menu'

export default () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const [selectedKey, setSelectedKey] = useState(pathname)

  const subMenuKeys = getSubMenuKeys(menu)

  useEffect(() => {
    setOpenKeysByPath(pathname)
    setSelectedKey(pathname)
  }, [pathname])

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
    <Menu
      mode="inline"
      theme="light"
      inlineIndent={16}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={[selectedKey]}
      onSelect={({ key }) => navigate(key)}
    >
      {renderMenu(menu)}
    </Menu>
  )
}
