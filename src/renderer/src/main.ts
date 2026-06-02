/**
 * 渲染进程入口
 * 挂载 Vue、Router、Pinia、i18n、Element Plus
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'
import router from './router'
import i18n from './locales'
import { useAppStore } from './store/app'
import './assets/main.css'
import './assets/base.css'

const app = createApp(App)

// 状态管理
const pinia = createPinia()
app.use(pinia)

// 路由
app.use(router)

// 国际化
app.use(i18n)

// Element Plus
app.use(ElementPlus)

// 初始化应用状态（主题、语言）
const appStore = useAppStore()
appStore.init()

app.mount('#app')
