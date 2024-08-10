<script setup lang="ts">
import headerTheme from './header-theme.vue'
import headerMy from './header-my.vue'
import headerSearch from './header-search/index.vue'

const router = useRouter()
const onHomeClick = () => {
  router.push('/')
}
</script>

<template>
  <div
    class="w-screen bg-white border-b border-b-zinc-100 dark:border-b-zinc-700 px-2 py-1 duration-500"
  >
    <div class="flex items-center justify-center">
      <m-svg-icon
        name="logo"
        class="guide-home w-4 h-4 mr-2 dark:fill-white cursor-pointer"
        @click="onHomeClick"
      ></m-svg-icon>
      <header-search class="mr-1"></header-search>
      <header-theme class="mr-1"></header-theme>
      <header-my class="mr-1"></header-my>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
