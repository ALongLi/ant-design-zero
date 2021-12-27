import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import menu from '@/config/menu'

const getPathNameMap = (menuItems: MenuItem[]) => {
  let result = {}
  for (const item of menuItems) {
    result[item.path] = item.name
    if (item.children) {
      result = { ...result, ...getPathNameMap(item.children) }
    }
  }
  return result
}

const PagePath = () => {
  const { pathname } = useLocation()
  const pathNameMap = getPathNameMap(menu)
  const segments = pathname.split('/').filter((i) => i)
  let breadcrumbItems = segments.map((_, index) => {
    const url = `/${segments.slice(0, index + 1).join('/')}`
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{pathNameMap[url]}</Link>
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
