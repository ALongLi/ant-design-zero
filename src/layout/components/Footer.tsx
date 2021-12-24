import React from 'react'
import { CopyrightOutlined, GithubOutlined } from '@ant-design/icons'

const Footer = () => {
  const corpName = import.meta.env.VITE_APP_CORP_NAME
  const copyright = `${new Date().getFullYear()} ${corpName}`
  return (
    <div className="app-layout-footer">
      <span>
        <CopyrightOutlined /> {copyright}
      </span>
      <a target="_blank" href="https://github.com/liamwang/ant-design-zero">
        <GithubOutlined />
      </a>
    </div>
  )
}

export default Footer
