<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import { useAppStore } from './store/app'
import type { LocaleType } from './locales'
import Versions from './components/Versions.vue'
import type { AppConfig } from '@common/types'

const { t } = useI18n()
const appStore = useAppStore()

const appConfig = ref<AppConfig | null>(null)

// Element Plus 语言包映射
const elementLocale = ref(zhCn)

function syncElementLocale(lang: LocaleType): void {
  elementLocale.value = lang === 'zh-CN' ? zhCn : en
}

onMounted(async () => {
  try {
    appConfig.value = await window.electronAPI.getAppConfig()
    syncElementLocale(appStore.locale)
  } catch {
    // 非 Electron 环境
  }
})
</script>

<template>
  <el-config-provider :locale="elementLocale">
    <div
      class="min-h-screen flex flex-col transition-colors duration-300"
      :class="appStore.theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'"
    >
      <!-- 顶栏 -->
      <header
        class="h-12 flex items-center px-4 select-none drag-region transition-colors duration-300 flex-shrink-0"
        :class="appStore.theme === 'dark' ? 'bg-gray-900 border-b border-gray-800' : 'bg-white border-b border-gray-200'"
      >
        <div class="flex items-center gap-3">
          <div
            class="w-3 h-3 rounded-full"
            :class="appStore.theme === 'dark' ? 'bg-primary-500' : 'bg-primary-600'"
          ></div>
          <h1 class="text-lg font-semibold tracking-wide">{{ appConfig?.appName || 'AppFrame' }}</h1>
        </div>

        <div class="ml-auto flex items-center gap-3 no-drag">
          <!-- 语言切换 -->
          <el-dropdown
            trigger="click"
            @command="(lang: string) => { appStore.setLocale(lang as LocaleType); syncElementLocale(lang as LocaleType) }"
          >
            <el-button :text="true" class="text-sm" :class="appStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'">
              <svg class="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              {{ appStore.locale === 'zh-CN' ? '中文' : 'English' }}
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="zh-CN">🇨🇳 中文</el-dropdown-item>
                <el-dropdown-item command="en-US">🇺🇸 English</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <!-- 主题切换 -->
          <el-tooltip :content="appStore.theme === 'dark' ? t('theme.light') : t('theme.dark')" placement="bottom">
            <el-button
              :text="true"
              class="text-lg"
              :class="appStore.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'"
              @click="appStore.toggleTheme()"
            >
              <svg v-if="appStore.theme === 'dark'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            </el-button>
          </el-tooltip>

          <!-- 版本/环境标签 -->
          <div class="flex items-center gap-2 text-xs">
            <el-tag size="small" :type="appStore.theme === 'dark' ? 'info' : 'primary'" effect="plain">
              v{{ appConfig?.appVersion || '0.0.0' }}
            </el-tag>
            <el-tag
              size="small"
              :type="appConfig?.appEnv === 'production' ? 'danger' : 'warning'"
              effect="dark"
            >
              {{ appConfig?.appEnv || 'unknown' }}
            </el-tag>
          </div>
        </div>
      </header>

      <!-- 路由视图 -->
      <router-view />

      <!-- 底栏 -->
      <Versions />
    </div>
  </el-config-provider>
</template>
