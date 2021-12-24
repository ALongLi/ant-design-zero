import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ProFormText, LoginForm } from '@ant-design/pro-form'
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons'
import Footer from '@/layout/components/Footer'
import styles from './.module.less'

const mockWait = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export default () => {
  const navigate = useNavigate()
  return (
    <div className={styles.login}>
      <LoginForm
        title="Ant Design Zero"
        subTitle="A starting point for new web applications."
        actions={
          <>
            其他登录方式
            <WechatOutlined className={styles.openicon} />
          </>
        }
        request={async (params) => {
          console.log(params)
          await mockWait(200)
          return {}
        }}
        onFinish={async (values) => {
          await mockWait(1000)
          console.log(values)
          navigate('/')
        }}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={'prefixIcon'} />,
          }}
          placeholder={'用户名: admin'}
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={'prefixIcon'} />,
          }}
          placeholder={'密码: 1111'}
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        />
      </LoginForm>
      <Footer />
    </div>
  )
}
