import React from 'react'
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons'

const Footer = () => {
  const corpName = import.meta.env.VITE_APP_CORP_NAME
  const copyright = `${new Date().getFullYear()} ${corpName}`
  return (
    <div className="app-footer" style={{ textAlign: 'center', fontSize: '12px' }}>
      {corpName ? (
        <span>
          <CopyrightOutlined /> {copyright}
        </span>
      ) : null}
      <a target="_blank" href="https://github.com/liamwang/ant-design-zero">
        <GithubOutlined />
      </a>
    </div>
  )
}

export default Footer
