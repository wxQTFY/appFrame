/**
 * 全局应用状态管理（Pinia）
 * 管理主题模式、语言偏好等全局状态
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'
import i18n from '../locales'
import type { LocaleType } from '../locales'

export type ThemeMode = 'light' | 'dark'

export const useAppStore = defineStore('app', () => {
  // ===== 主题状态 =====
  const theme = ref<ThemeMode>('dark')

  function initTheme(): void {
    const saved = localStorage.getItem('app-theme') as ThemeMode | null
    if (saved === 'light' || saved === 'dark') {
      theme.value = saved
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      theme.value = prefersDark ? 'dark' : 'light'
    }
    applyTheme()
  }

  function toggleTheme(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme()
  }

  function setTheme(mode: ThemeMode): void {
    theme.value = mode
    applyTheme()
  }

  function applyTheme(): void {
    localStorage.setItem('app-theme', theme.value)
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // ===== 语言状态 =====
  const locale = ref<LocaleType>('zh-CN')

  function initLocale(): void {
    const saved = localStorage.getItem('app-locale') as LocaleType | null
    if (saved === 'zh-CN' || saved === 'en-US') {
      locale.value = saved
    }
    // 同步到 i18n 实例
    i18n.global.locale.value = locale.value
  }

  function setLocale(lang: LocaleType): void {
    locale.value = lang
    localStorage.setItem('app-locale', lang)
    i18n.global.locale.value = lang
  }

  // ===== 初始化 =====
  function init(): void {
    initTheme()
    initLocale()
  }

  return {
    theme,
    locale,
    init,
    toggleTheme,
    setTheme,
    setLocale
  }
})
