/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly VITE_BASE_URL: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_APP_CORP_NAME: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
