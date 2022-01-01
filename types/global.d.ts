interface MenuItem {
  name: string
  path: string
  icon?: React.ReactNode
  page?: () => Promise<{ default: ComponentType }>
  hide?: boolean
  children?: MenuItem[]
}

/**
 * HSC: Header Sider Content
 * SHC: Sider Header Content
 */
type LayoutType = 'HSC' | 'SHC'

interface ApiResult<TData> {
  code: number
  data: TData | undefined
  message: string | undefined
}

interface AuthData {
  accessToken: string
  expiresAt: number
  refreshToken: string
  userInfo: UserInfo
}

interface UserInfo {
  id: number | string
  name: string
  avatar: string
}

interface LoginForm {
  username: string
  password: string
}
