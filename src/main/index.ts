/**
 * Electron 主进程入口
 */

import { app, BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { getAllPaths } from './config/paths'
import { IPC_CHANNELS, type AppConfig } from '../common/types'

// 环境变量（electron-vite 会自动加载 .env 文件）
const APP_NAME = import.meta.env.VITE_APP_NAME || 'AppFrame'
const APP_VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0'
const APP_ENV = import.meta.env.VITE_APP_ENV || 'production'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    title: APP_NAME,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow?.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 开发模式打开 DevTools
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 注册 IPC 处理器
function registerIpcHandlers(): void {
  // 获取应用配置
  ipcMain.handle(IPC_CHANNELS.GET_APP_CONFIG, (): AppConfig => {
    return {
      appName: APP_NAME,
      appVersion: APP_VERSION,
      appEnv: APP_ENV as AppConfig['appEnv'],
      apiBaseUrl: API_BASE_URL
    }
  })

  // 获取平台信息
  ipcMain.handle(IPC_CHANNELS.GET_PLATFORM, (): string => {
    return process.platform
  })

  // 获取所有本地路径
  ipcMain.handle(IPC_CHANNELS.GET_PATHS, () => {
    return getAllPaths()
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.appframe')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  registerIpcHandlers()
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
