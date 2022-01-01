import { useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation()
  return <div>The location of current page: {location.pathname}</div>
}
