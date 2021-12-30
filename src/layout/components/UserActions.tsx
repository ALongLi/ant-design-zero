import { Menu, Dropdown } from 'antd'
import { KeyOutlined, PoweroffOutlined } from '@ant-design/icons'
import { useAuth } from '@/context/auth'

export default () => {
  const { auth, logout } = useAuth()

  const handleMenuClick = (e: { key: string }) => {
    if (e.key === 'logout') {
      logout()
    }
  }

  const menu = (
    <Menu style={{ minWidth: '135px' }} onClick={handleMenuClick}>
      <Menu.Item key="changepwd">
        <KeyOutlined /> 修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <PoweroffOutlined /> 退出系统
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <span className="app-layout-action">
        <img style={{ width: '24px', height: '24px' }} src="/assets/avatar.png" />
        <span style={{ marginLeft: '10px' }}>{auth?.userInfo?.name}</span>
      </span>
    </Dropdown>
  )
}
