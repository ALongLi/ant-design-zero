import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/context/router'
import AuthProvider from '@/context/auth'

import './styles/index.less'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
