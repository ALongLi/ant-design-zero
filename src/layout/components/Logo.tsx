export default ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className="app-layout-logo" onClick={() => (location.href = '/')}>
      <img src="/logo.svg" alt="Logo" />
      {collapsed ? null : <h1>{import.meta.env.VITE_APP_NAME}</h1>}
    </div>
  )
}
