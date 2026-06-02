<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '../store/app'

const appStore = useAppStore()

const versions = ref({
  appVersion: '',
  platform: ''
})

onMounted(async () => {
  try {
    const appConfig = await window.electronAPI.getAppConfig()
    const platform = await window.electronAPI.getPlatform()
    versions.value.appVersion = appConfig.appVersion
    versions.value.platform = platform
  } catch {
    // 非 Electron 环境，静默处理
  }
})
</script>

<template>
  <footer
    class="h-8 flex items-center justify-center gap-4 text-xs select-none transition-colors duration-300"
    :class="appStore.theme === 'dark'
      ? 'bg-gray-900 border-t border-gray-800 text-gray-500'
      : 'bg-white border-t border-gray-200 text-gray-400'"
  >
    <span>AppFrame v{{ versions.appVersion || '0.0.0' }}</span>
    <span class="text-gray-600 dark:text-gray-700">|</span>
    <span>{{ $t('app.platform') }}: {{ versions.platform || 'web' }}</span>
    <span class="text-gray-600 dark:text-gray-700">|</span>
    <span>Vue 3 + Electron + Tailwind + Element Plus</span>
  </footer>
</template>
