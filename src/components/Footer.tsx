import { GithubOutlined } from '@ant-design/icons'
import { DefaultFooter } from '@ant-design/pro-layout'

const Footer: React.FC = () => {
  const corp = import.meta.env.VITE_APP_CORP_NAME
  const copyright = corp ? `${new Date().getFullYear()} ${corp}` : undefined

  return (
    <DefaultFooter
      copyright={copyright}
      links={[
        {
          key: '1',
          title: 'Ant Design Zero',
          href: 'https://github.com/liamwang/ant-design-zero',
          blankTarget: true,
        },
        {
          key: '2',
          title: <GithubOutlined />,
          href: 'https://github.com/liamwang/ant-design-zero',
          blankTarget: true,
        },
        {
          key: '3',
          title: 'Liam Wang',
          href: 'https://github.com/liamwang',
          blankTarget: true,
        },
      ]}
    />
  )
}

export default Footer
