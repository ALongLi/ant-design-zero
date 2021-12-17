import { Link, Outlet } from 'react-router-dom'

const Layout = () => (
  <div>
    <nav>
      <Link to="/login">Logout</Link>
    </nav>
    <div>
      <Outlet />
    </div>
  </div>
)

export default Layout
