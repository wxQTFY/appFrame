/**
 * Preload 类型声明
 * 为渲染进程提供类型安全的 API 调用
 */

import type { AppConfig } from '../common/types'

interface ElectronAPI {
  getAppConfig: () => Promise<AppConfig>
  getPlatform: () => Promise<NodeJS.Platform>
  getPaths: () => Promise<Record<string, string>>
  openFileDialog: (options: {
    title?: string
    filters?: { name: string; extensions: string[] }[]
    multiSelections?: boolean
  }) => Promise<string[] | null>
  showMessageBox: (options: {
    type?: 'info' | 'warning' | 'error'
    title?: string
    message: string
  }) => Promise<void>
}

interface Window {
  electronAPI: ElectronAPI
}
