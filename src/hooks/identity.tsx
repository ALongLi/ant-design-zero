import React, { ReactNode, useEffect } from 'react'
import * as userService from '@/service/user'

const storeKey = '__user_identity'

interface UserIdentity {
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

interface AuthForm {
  username: string
  password: string
}

const getIdentity = (): UserIdentity | null => {
  const text = window.localStorage.getItem(storeKey)
  if (text) {
    return JSON.parse(text)
  }
  return null
}

const setIdentity = (data: UserIdentity | null) => {
  if (!data) window.localStorage.removeItem(storeKey)
  window.localStorage.setItem(storeKey, JSON.stringify(data))
}

interface IdentityContextType {
  identity: UserIdentity | null
  login: (form: AuthForm) => Promise<void>
  logout: () => Promise<void>
}

const IdentityContext = React.createContext<IdentityContextType | undefined>(undefined)
IdentityContext.displayName = 'IdentityContext'

export const IdentityProvider = ({ children }: { children: ReactNode }) => {
  // point free
  const login = (form: AuthForm) => userService.login(form).then(setIdentity)
  const logout = () =>
    userService.logout().then(() => {
      setIdentity(null)
    })

  const identity = getIdentity()

  useEffect(() => {
    if (!identity) {
      // todo: 跳转到登录页
      return
    }
    if (Date.now() > identity.expiresAt - 3600) {
      // todo: 刷新 Token
    }
  }, [])

  return <IdentityContext.Provider children={children} value={{ identity, login, logout }} />
}

export const useAuth = () => {
  const context = React.useContext(IdentityContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}

export default {}
