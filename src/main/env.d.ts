/**
 * 主进程环境变量类型声明
 * 对应 .env.development / .env.production
 */
interface ImportMetaEnv {
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_DEVTOOLS: string
  readonly VITE_CONSOLE_LEVEL: string
  readonly VITE_DEV_SERVER_PORT: string
  readonly VITE_BACKEND_PORT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
