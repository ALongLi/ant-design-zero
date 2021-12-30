import React, { ReactNode } from 'react'
import { Navigate, useNavigate, useLocation } from 'react-router-dom'
import { getAuthData, setAuthData } from '@/utils/storage'
import * as userService from '@/service/user'

interface AuthContextType {
  auth: AuthResult | null
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
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const login = async (form: LoginForm) => {
    const authData = await userService.login(form)
    setAuthData(authData)
    navigate('/')
  }

  const logout = async () => {
    await userService.logout()
    setAuthData(null)
    navigate('/login')
  }

  const auth = getAuthData()

  if (!auth && pathname !== '/login') {
    return <Navigate to="/login" />
  }

  return <AuthContext.Provider children={children} value={{ auth, login, logout }} />
}

export default AuthProvider
