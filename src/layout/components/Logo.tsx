export default ({ collapsed }: { collapsed: boolean }) => {
  return (
    <a href="/" className="app-layout-logo">
      <img src="/logo.svg" alt="Logo" />
      {collapsed ? null : <h1>{import.meta.env.VITE_APP_NAME}</h1>}
    </a>
  )
}
