import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'

const breadcrumbNameMap = {
  '/apps': 'Application List',
  '/apps/1': 'Application1',
  '/apps/2': 'Application2',
  '/apps/1/detail': 'Detail',
  '/apps/2/detail': 'Detail',
}

const PagePath = () => {
  const location = useLocation()
  const segments = location.pathname.split('/').filter((i) => i)
  let breadcrumbItems = segments.map((_, index) => {
    const url = `/${segments.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    )
  })

  breadcrumbItems = [
    <Breadcrumb.Item key="/">
      <Link to="/">首页</Link>
    </Breadcrumb.Item>,
  ].concat(breadcrumbItems)

  return <Breadcrumb>{breadcrumbItems}</Breadcrumb>
}

export default PagePath
