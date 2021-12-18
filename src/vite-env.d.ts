/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DROP_CONSOLE: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
