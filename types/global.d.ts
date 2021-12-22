interface RouteItem {
  name: string
  path: string
  icon?: React.ReactNode
  page?: () => Promise<{ default: React.ComponentType }>
  hide?: false
  children?: RouteItem[]
}
