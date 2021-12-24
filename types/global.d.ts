interface MenuItem {
  name: string
  path: string
  icon?: React.ReactNode
  page?: () => Promise<{ default: ComponentType }>
  hide?: false
  children?: MenuItem[]
}

/**
 * HSC: Header Sider Content
 * SHC: Sider Header Content
 */
type LayoutType = 'HSC' | 'SHC'
