/**
 * 主进程路径配置
 * 管理应用数据目录、用户文档目录、静态资源目录、日志目录
 */

import { app } from 'electron'
import { join } from 'path'

/**
 * 应用数据目录（用户数据）
 * Windows: %APPDATA%/AppFrame
 * macOS: ~/Library/Application Support/AppFrame
 * Linux: ~/.config/AppFrame
 */
export function getAppDataDir(): string {
  return app.getPath('userData')
}

/**
 * 用户文档目录
 * Windows: 我的文档
 * macOS: ~/Documents
 * Linux: ~/Documents
 */
export function getDocumentsDir(): string {
  return app.getPath('documents')
}

/**
 * 静态资源目录（打包后 resources 目录）
 */
export function getStaticDir(): string {
  return join(process.resourcesPath, 'resources')
}

/**
 * 日志目录
 */
export function getLogDir(): string {
  return join(getAppDataDir(), 'logs')
}

/**
 * 获取所有本地路径的统一对象
 */
export function getAllPaths() {
  return {
    appData: getAppDataDir(),
    documents: getDocumentsDir(),
    static: getStaticDir(),
    logs: getLogDir(),
    desktop: app.getPath('desktop'),
    downloads: app.getPath('downloads'),
    home: app.getPath('home'),
    temp: app.getPath('temp')
  }
}
