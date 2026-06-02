/**
 * Preload 脚本
 * 通过 contextBridge 安全地暴露 IPC 接口给渲染进程
 */

import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS } from '../common/types'

// 暴露给渲染进程的 API
const electronAPI = {
  // 获取应用配置
  getAppConfig: () => ipcRenderer.invoke(IPC_CHANNELS.GET_APP_CONFIG),

  // 获取平台信息
  getPlatform: () => ipcRenderer.invoke(IPC_CHANNELS.GET_PLATFORM),

  // 获取本地路径
  getPaths: () => ipcRenderer.invoke(IPC_CHANNELS.GET_PATHS),

  // 打开文件对话框
  openFileDialog: (options: {
    title?: string
    filters?: { name: string; extensions: string[] }[]
    multiSelections?: boolean
  }) => ipcRenderer.invoke(IPC_CHANNELS.OPEN_FILE_DIALOG, options),

  // 显示消息框
  showMessageBox: (options: {
    type?: 'info' | 'warning' | 'error'
    title?: string
    message: string
  }) => ipcRenderer.invoke(IPC_CHANNELS.SHOW_MESSAGE_BOX, options)
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)
