import { Menu, Dropdown } from 'antd'
import { KeyOutlined, PoweroffOutlined } from '@ant-design/icons'

export default () => {
  const menu = (
    <Menu style={{ minWidth: '150px' }}>
      <Menu.Item key="1">
        <KeyOutlined /> 修改密码
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">
        <PoweroffOutlined /> 退出系统
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} placement="bottomRight">
      <span className="app-layout-action">
        <img style={{ width: '24px', height: '24px' }} src="/assets/avatar.png" />
        <span style={{ marginLeft: '10px' }}>Admin</span>
      </span>
    </Dropdown>
  )
}
