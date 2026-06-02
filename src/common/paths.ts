/**
 * 路径工具函数
 * 封装 Windows 兼容的路径处理，主进程和渲染进程均可调用
 */

import path from 'path'

/**
 * 规范化 Windows 路径：反斜杠转正斜杠
 * 确保路径在 Windows 和 Unix 系统间表现一致
 */
export function normalizePath(filePath: string): string {
  return filePath.replace(/\\/g, '/')
}

/**
 * 拼接路径并规范化
 */
export function joinPath(...segments: string[]): string {
  return normalizePath(path.join(...segments))
}

/**
 * 获取文件名（不含扩展名）
 */
export function getBaseName(filePath: string): string {
  return path.basename(filePath, path.extname(filePath))
}

/**
 * 获取文件扩展名（小写）
 */
export function getExtension(filePath: string): string {
  return path.extname(filePath).toLowerCase()
}

/**
 * 获取父目录路径
 */
export function getDirName(filePath: string): string {
  return normalizePath(path.dirname(filePath))
}

/**
 * 将路径转换为 file:// URL
 */
export function pathToFileUrl(filePath: string): string {
  const normalized = filePath.replace(/\\/g, '/')
  // Windows 盘符处理：C:/ -> /C:/
  if (/^[a-zA-Z]:\//.test(normalized)) {
    return `file:///${normalized}`
  }
  return `file://${normalized.startsWith('/') ? '' : '/'}${normalized}`
}

/**
 * 检查是否为 Windows 平台
 */
export function isWindows(): boolean {
  return process.platform === 'win32'
}

/**
 * 检查是否为 macOS 平台
 */
export function isMac(): boolean {
  return process.platform === 'darwin'
}

/**
 * 检查是否为 Linux 平台
 */
export function isLinux(): boolean {
  return process.platform === 'linux'
}
