<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import { useAppStore } from '../store/app'
import type { AppConfig } from '@common/types'

const { t } = useI18n()
const appStore = useAppStore()

const appConfig = ref<AppConfig | null>(null)
const platform = ref('')
const userDataPath = ref('')

onMounted(async () => {
  try {
    appConfig.value = await window.electronAPI.getAppConfig()
    platform.value = await window.electronAPI.getPlatform()
    const paths = await window.electronAPI.getPaths()
    userDataPath.value = paths.appData
  } catch {
    console.warn('Electron API 不可用（可能运行在浏览器中）')
  }
})
</script>

<template>
  <main class="flex-1 flex items-center justify-center p-8">
    <div class="text-center space-y-8 w-full max-w-2xl">
      <!-- Logo -->
      <div
        class="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-300"
        :class="appStore.theme === 'dark'
          ? 'bg-gradient-to-br from-primary-500 to-purple-600 shadow-primary-500/20'
          : 'bg-gradient-to-br from-primary-400 to-purple-500 shadow-primary-400/20'"
      >
        <svg class="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- 标题 -->
      <div class="space-y-2">
        <h2
          class="text-2xl font-bold transition-colors duration-300"
          :class="appStore.theme === 'dark' ? 'text-white' : 'text-gray-900'"
        >
          {{ t('app.title') }}
        </h2>
        <p
          class="text-sm transition-colors duration-300"
          :class="appStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'"
        >
          {{ t('app.subtitle') }}
        </p>
      </div>

      <!-- 信息卡片 -->
      <div class="grid grid-cols-3 gap-4">
        <div
          class="rounded-xl p-4 border transition-all duration-300"
          :class="appStore.theme === 'dark'
            ? 'bg-gray-900 border-gray-800 hover:border-primary-800'
            : 'bg-white border-gray-200 hover:border-primary-300'"
        >
          <div class="text-2xl font-bold" :class="appStore.theme === 'dark' ? 'text-primary-400' : 'text-primary-600'">
            {{ appConfig ? '✓' : '...' }}
          </div>
          <div class="text-xs mt-1" :class="appStore.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'">
            {{ t('app.configLoaded') }}
          </div>
        </div>
        <div
          class="rounded-xl p-4 border transition-all duration-300"
          :class="appStore.theme === 'dark'
            ? 'bg-gray-900 border-gray-800 hover:border-primary-800'
            : 'bg-white border-gray-200 hover:border-primary-300'"
        >
          <div class="text-2xl font-bold" :class="appStore.theme === 'dark' ? 'text-primary-400' : 'text-primary-600'">
            {{ platform || '...' }}
          </div>
          <div class="text-xs mt-1" :class="appStore.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'">
            {{ t('app.platform') }}
          </div>
        </div>
        <div
          class="rounded-xl p-4 border transition-all duration-300"
          :class="appStore.theme === 'dark'
            ? 'bg-gray-900 border-gray-800 hover:border-primary-800'
            : 'bg-white border-gray-200 hover:border-primary-300'"
        >
          <div class="text-2xl font-bold truncate text-sm" :class="appStore.theme === 'dark' ? 'text-primary-400' : 'text-primary-600'">
            {{ userDataPath ? '✓' : '...' }}
          </div>
          <div class="text-xs mt-1" :class="appStore.theme === 'dark' ? 'text-gray-500' : 'text-gray-400'">
            {{ t('app.dataDir') }}
          </div>
        </div>
      </div>

      <!-- 主题/语言切换按钮组 -->
      <div class="flex justify-center gap-4">
        <el-button
          :type="appStore.theme === 'dark' ? 'primary' : 'default'"
          :dark="appStore.theme === 'dark' ? true : undefined"
          @click="appStore.toggleTheme()"
        >
          {{ appStore.theme === 'dark' ? t('theme.light') : t('theme.dark') }}
        </el-button>
        <el-button
          :type="appStore.locale === 'zh-CN' ? 'primary' : 'default'"
          :dark="appStore.theme === 'dark' ? true : undefined"
          @click="appStore.setLocale(appStore.locale === 'zh-CN' ? 'en-US' : 'zh-CN')"
        >
          {{ appStore.locale === 'zh-CN' ? 'English' : '中文' }}
        </el-button>
      </div>

      <!-- 提示文字 -->
      <p
        class="text-xs transition-colors duration-300"
        :class="appStore.theme === 'dark' ? 'text-gray-600' : 'text-gray-300'"
      >
        {{ t('lang.switch') }} · {{ t('theme.toggle') }}
      </p>
    </div>
  </main>
</template>
