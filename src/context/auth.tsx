import React, { ReactNode } from 'react'
import { getAuthData, setAuthData } from '@/utils/storage'
import * as userService from '@/service/user'

interface AuthContextType {
  auth: AuthData | null
  login: (form: LoginForm) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)
AuthContext.displayName = 'AuthContext'

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth 必须在 AuthProvider 中使用')
  }
  return context
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const login = async (form: LoginForm) => {
    const authData = await userService.login(form)
    setAuthData(authData)
    location.href = '/'
  }

  const logout = async () => {
    setAuthData(null)
    location.reload()
  }

  const auth = getAuthData()
  const path = location.pathname.toLocaleLowerCase()
  if (!auth && !path.startsWith('/login')) {
    location.href = '/login'
  }

  return <AuthContext.Provider children={children} value={{ auth, login, logout }} />
}

export default AuthProvider
