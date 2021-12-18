import { lazy, FC } from 'react'
import { RouteObject } from 'react-router'
import { BrowserRouter, Routes, Route, useRoutes, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'

import Home from '../pages/Home'
import Login from '../pages/Login'
// const Home = lazy(() => import('../pages/Home'))
// const Login = lazy(() => import('../pages/Login'))

// const routes: RouteObject[] = [
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { path: '/', element: <Index /> },
//       { path: '/about', element: <About /> },
//     ],
//   },
//   // { path: '/about', element: About }
// ]

// const RouteElements = () => useRoutes(routes)

const NotFound = () => <div>404</div>

const RenderRouter: FC = () => {
  console.log(111)
  return (
    <BrowserRouter>
      {/* <RouteElements /> */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RenderRouter
