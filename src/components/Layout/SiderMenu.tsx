import { useNavigate } from 'react-router-dom'
import { Menu } from 'antd'
import routes from '@/config/routes'

export default () => {
  const navigate = useNavigate()
  const onSelect = ({ key }) => {
    navigate(key)
  }

  const renderMenuItems = (items: RouteItem[]) => {
    return items
      .filter((item) => !item.hide)
      .map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.path} title={item.name} icon={item.icon}>
            {renderMenuItems(item.children)}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.path} icon={item.icon}>
            {item.name}
          </Menu.Item>
        )
      )
  }

  return (
    <Menu mode="inline" defaultSelectedKeys={['/']} inlineIndent={16} onSelect={onSelect}>
      {renderMenuItems(routes)}
    </Menu>
  )
}
