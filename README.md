# AppFrame

> Electron + Vue 3 + TypeScript + Tailwind CSS + Element Plus 桌面应用开发框架
> 开箱即用 · Windows 10/11 兼容 · 多语言 · 主题切换 · 状态管理

---

## 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 启动开发环境（热更新 HMR）
npm run dev

# 3. 打包构建 Windows 安装包
npm run build:win
```

---

## 目录结构

```
appFrame/
├── .env.development              # 开发环境变量
├── .env.production               # 生产环境变量
├── .gitignore
├── .npmrc                        # npm 镜像配置（国内加速）
├── package.json                  # 依赖 + 脚本
├── electron-builder.yml          # 打包配置
├── electron.vite.config.ts       # 核心构建配置（含 AutoImport / Components）
├── tailwind.config.ts            # Tailwind CSS 配置（darkMode: class）
├── postcss.config.cjs            # PostCSS 配置
├── tsconfig.json / .node / .web  # TypeScript 三件套
├── README.md
├── resources/icon.png
├── build/entitlements.mac.plist
└── src/
    ├── common/                   # 共享模块
    │   ├── paths.ts              # 路径工具（Windows 兼容）
    │   └── types.ts              # 类型 + IPC 通道
    ├── main/                     # Electron 主进程
    │   ├── index.ts              # 窗口创建 + IPC 注册
    │   └── config/paths.ts       # 本地路径配置
    ├── preload/                  # 预加载脚本
    │   ├── index.ts              # contextBridge 安全 API
    │   └── index.d.ts            # 类型声明
    └── renderer/                 # Vue 3 渲染进程
        ├── index.html
        └── src/
            ├── main.ts           # 入口（挂载 Pinia / i18n / Element Plus）
            ├── App.vue           # 根组件（主题 + 语言切换）
            ├── env.d.ts
            ├── auto-imports.d.ts  # 自动导入类型
            ├── components.d.ts   # 组件自动注册类型
            ├── assets/
            │   ├── main.css      # Tailwind 指令
            │   └── base.css      # 全局样式
            ├── locales/          # 🌐 国际化
            │   ├── index.ts      # vue-i18n 配置
            │   ├── zh-CN.ts      # 中文语言包
            │   └── en-US.ts      # 英文语言包
            ├── store/            # 📦 状态管理
            │   └── app.ts        # 全局 store（主题 + 语言）
            ├── components/
            │   └── Versions.vue  # 底栏组件
            └── router/
                └── index.ts      # Vue Router 路由
```

---

## 可用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发环境（热重载 + DevTools） |
| `npm run build` | 类型检查 + 构建 |
| `npm run build:win` | 构建 Windows 安装包 (.exe) |
| `npm run build:mac` | 构建 macOS DMG |
| `npm run build:linux` | 构建 Linux AppImage |
| `npm run typecheck` | TypeScript 全量类型检查 |

---

## 🌐 国际化

默认中文，支持一键切换中/英文：

| 文件 | 说明 |
|------|------|
| `src/renderer/src/locales/zh-CN.ts` | 中文语言包 |
| `src/renderer/src/locales/en-US.ts` | 英文语言包 |
| `src/renderer/src/locales/index.ts` | vue-i18n 配置，fallback 中文 |

**模板中使用：**
```vue
<template>
  <p>{{ $t('app.title') }}</p>
</template>

<script setup lang="ts">
const { t } = useI18n()
console.log(t('app.title'))
</script>
```

**切换语言：**
```ts
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
appStore.setLocale('en-US')  // 或 'zh-CN'
```

---

## 🎨 主题切换

支持暗黑/明亮两种模式，通过 Tailwind CSS `darkMode: 'class'` 策略实现：

| 操作 | 效果 |
|------|------|
| 点击顶栏太阳/月亮图标 | 切换主题 |
| `appStore.toggleTheme()` | 代码切换 |
| `appStore.setTheme('dark')` | 强制设置 |

- 主题偏好通过 `localStorage` 持久化
- 首次加载自动跟随系统 `prefers-color-scheme`
- Element Plus 暗黑 CSS 变量同步加载
- 全局过渡动画 300ms

---

## 📦 Element Plus

集成 Element Plus 2.x，按需自动导入：

- **组件自动注册** — `unplugin-vue-components` + `ElementPlusResolver()`
- **API 自动导入** — `unplugin-auto-import` + `ElementPlusResolver()`
- **暗黑模式** — 导入 `element-plus/theme-chalk/dark/css-vars.css`

**注意：** 全局 API（如 `ElMessage`、`ElNotification` 等）需手动引入：
```ts
import { ElMessage } from 'element-plus'
ElMessage.success('操作成功')
```

---

## 📦 Pinia 状态管理

```ts
// 定义 store
import { defineStore } from 'pinia'
export const useAppStore = defineStore('app', () => { ... })

// 使用 store
import { useAppStore } from '@/store/app'
const appStore = useAppStore()
appStore.toggleTheme()
```

当前内置 store 模块：

| 模块 | 状态 | 方法 |
|------|------|------|
| `app.theme` | `'dark' \| 'light'` | `toggleTheme()`, `setTheme()` |
| `app.locale` | `'zh-CN' \| 'en-US'` | `setLocale()` |

---

## 环境变量

| 变量 | 说明 | 开发值 | 生产值 |
|------|------|--------|--------|
| `VITE_APP_NAME` | 应用名 | AppFrame | AppFrame |
| `VITE_APP_VERSION` | 版本 | 1.0.0 | 1.0.0 |
| `VITE_APP_ENV` | 环境 | development | production |
| `VITE_API_BASE_URL` | 接口地址 | http://localhost:5173/api | https://api.example.com |

---

## 技术栈

| 类别 | 技术 | 用途 |
|------|------|------|
| 桌面框架 | Electron 33 | 跨平台桌面容器 |
| 构建工具 | electron-vite 2 + Vite 6 | HMR + 编译 |
| 前端框架 | Vue 3 (Composition API) | 组件化 UI |
| 样式方案 | Tailwind CSS 3 + PostCSS | 原子化 CSS |
| UI 组件 | Element Plus 2 | 桌面级组件库 |
| 状态管理 | Pinia 2 | 全局状态 |
| 国际化 | vue-i18n 9 | 多语言 |
| 类型系统 | TypeScript 5 | 类型安全 |
| 打包分发 | electron-builder 25 | exe / dmg / AppImage |

---

## 架构说明

```
┌──────────────┐    IPC     ┌─────────────────────────────────┐
│  主进程       │◄────────►│  渲染进程                        │
│  main/        │ context  │  - Vue 3 + Element Plus          │
│  - 窗口管理   │ Bridge   │  - Pinia（主题/语言状态）         │
│  - IPC 服务   │          │  - vue-i18n（中/英切换）          │
│  - 路径配置   │          │  - Vue Router（Hash 路由）        │
│  - 环境变量   │          │  - Tailwind CSS（dark/light）     │
└──────┬───────┘           └─────────────────────────────────┘
       │
       │ contextBridge（安全隔离）
       │
       └── preload/（API 暴露 + 类型声明）
```

### 安全策略

- `contextIsolation: true` — 渲染进程隔离
- `nodeIntegration: false` — 禁止 Node.js 直接访问
- `IPC_CHANNELS` 白名单 — 仅暴露必要通道
- CSP 安全头 — 限制资源加载

---

## 常见问题

**Q: npm run dev 后窗口空白？**
A: 确认执行 `npm install`，Node.js >= 18。

**Q: TypeScript 报 auto-imports.d.ts 相关错误？**
A: 执行一次 `npm run dev`，unplugin 会自动生成完整类型文件覆盖占位文件。

**Q: 如何添加新语言？**
A: 在 `src/renderer/src/locales/` 下新建文件，在 `index.ts` 中引入并注册到 `createI18n()` 的 `messages` 中。

**Q: 如何扩展 Pinia store？**
A: 在 `src/renderer/src/store/` 下新建 `.ts` 文件，使用 `defineStore` 定义，在组件中 `useXxxStore()` 即可。
