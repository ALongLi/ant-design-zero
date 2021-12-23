interface MenuItem {
  name: string
  path: string
  icon?: React.ReactNode
  page?: () => Promise<{ default: ComponentType }>
  hide?: false
  children?: MenuItem[]
}
