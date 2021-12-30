import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Routes } from '@/context/router'
import AuthProvider from '@/context/auth'

import './styles/index.less'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
