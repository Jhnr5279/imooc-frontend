<script setup lang="ts">
import { THEME_TYPE } from '@/constants'
import { useThemeStore } from '@/stores/modules/theme'

const themeArr = [
  { id: 0, type: THEME_TYPE.THEME_LIGHT, icon: 'theme-light', name: '极简白' },
  { id: 1, type: THEME_TYPE.THEME_DARK, icon: 'theme-dark', name: '极夜黑' },
  {
    id: 2,
    type: THEME_TYPE.THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

const store = useThemeStore()
const onChangeThemeClick = (type: THEME_TYPE) => {
  store.setThemeType(type)
  setIconName(type)
}

const setIconName = (type: THEME_TYPE) => {
  themeArr.forEach((item) => {
    if (item.type === type) {
      store.iconName = item.icon
    }
  })
}
</script>

<template>
  <m-popover placement="bottom-left" class="guide-theme">
    <template #reference>
      <m-svg-icon
        :name="store.iconName"
        class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 hover:bg-zinc-100/60 outline-none dark:hover:bg-zinc-900"
        fill-class="fill-zinc-900 dark:fill-zinc-200"
      ></m-svg-icon>
    </template>
    <div class="w-[110px] overflow-hidden">
      <div
        class="hover:bg-zinc-100/60 flex items-center p-1 rounded cursor-pointer duration-200 dark:hover:bg-zinc-700"
        v-for="item in themeArr"
        :key="item.id"
        @click="onChangeThemeClick(item.type)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
        <span class="text-zinc-800 text-sm dark:text-zinc-200">{{
          item.name
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style lang="scss" scoped></style>
