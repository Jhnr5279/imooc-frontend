<script lang="ts">
export default {
  name: 'home'
}
</script>
<script setup lang="ts">
import NavigationVue from './components/navigation/index.vue'
import ListVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexibel'
import { useAppStore, useUserStore } from '@/stores'
import { useScroll } from '@vueuse/core'

const userStore = useUserStore()
const router = useRouter()

const onVipClick = () => {
  appStore.routerType = 'push'
  router.push('/member')
}

const appStore = useAppStore()
const onMyClick = () => {
  // 移动端下跳转类型
  appStore.routerType = 'push'
  if (userStore.token) {
    router.push('/profile')
  } else {
    router.push('/login')
  }
}

const containerTarget = ref<HTMLDivElement | null>(null)
const { y: containerScrollY } = useScroll(containerTarget)
onActivated(() => {
  if (!containerTarget.value) return
  containerTarget.value.scrollTop = containerScrollY.value
})
</script>

<template>
  <main
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
    ref="containerTarget"
  >
    <navigation-vue />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <list-vue></list-vue>
    </div>
    <m-trigger-menu
      v-if="isMobileTerminal"
      class="fixed bottom-6 m-auto left-0 right-0 w-[220px]"
    >
      <m-trigger-menu-item
        icon="home"
        iconClass="fill-zinc-900 dark:fill-zinc-200"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="userStore.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
        VIP
      </m-trigger-menu-item>
      <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onMyClick"
      >
        {{ userStore.token ? '我的' : '去登录' }}
      </m-trigger-menu-item>
    </m-trigger-menu>
  </main>
</template>

<style lang="scss" scoped></style>
