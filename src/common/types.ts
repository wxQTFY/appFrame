/**
 * 应用通用类型定义
 */

/** 环境标识 */
export type AppEnv = 'development' | 'production' | 'test'

/** 应用配置 */
export interface AppConfig {
  appName: string
  appVersion: string
  appEnv: AppEnv
  apiBaseUrl: string
}

/** IPC 通道定义 */
export const IPC_CHANNELS = {
  GET_APP_CONFIG: 'app:get-config',
  GET_PLATFORM: 'app:get-platform',
  GET_PATHS: 'app:get-paths',
  OPEN_FILE_DIALOG: 'dialog:open-file',
  SHOW_MESSAGE_BOX: 'dialog:show-message'
} as const

/** 文件对话框选项 */
export interface FileDialogOptions {
  title?: string
  defaultPath?: string
  filters?: FileFilter[]
  multiSelections?: boolean
}

/** 文件过滤器 */
export interface FileFilter {
  name: string
  extensions: string[]
}
