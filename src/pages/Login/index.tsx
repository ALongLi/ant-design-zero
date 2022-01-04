import { ProFormText, LoginForm } from '@ant-design/pro-form'
import { LockOutlined, UserOutlined, WechatOutlined } from '@ant-design/icons'
import Footer from '@/layout/components/Footer'
import { useAuth } from '@/context/auth'
import styles from './index.module.less'

const mockWait = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export default () => {
  const auth = useAuth()
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
        request={async () => {
          await mockWait(200)
          return { username: '', password: '' }
        }}
        onFinish={async (values: LoginForm) => {
          await auth.login(values)
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
          placeholder={'密码: admin'}
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
