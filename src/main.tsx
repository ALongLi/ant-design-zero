import React from 'react'
import ReactDOM from 'react-dom'
import Router from '@/context/router'

import './styles/index.less'

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
)
