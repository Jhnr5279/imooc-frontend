<script setup lang="ts">
import { confirm } from '@/libs'
import { useAppStore } from '@/stores'
import { useUserStore } from '@/stores/modules/user'

type ThemeArrItem = {
  id: number
  title: string
  icon: string
  path: string
}
const themeArr = [
  { id: 0, title: '个人资料', icon: 'profile', path: '/profile' },
  { id: 1, title: '升级VIP', icon: 'vip-profile', path: '/member' },
  { id: 2, title: '退出登录', icon: 'logout', path: '' }
]

const router = useRouter()
const appStore = useAppStore()
const onLoginClick = () => {
  // 移动端下跳转类型
  appStore.routerType = 'push'
  router.push('/login')
}

const userStore = useUserStore()

const onItemClick = (item: ThemeArrItem) => {
  if (item.id === 2) {
    confirm('确定退出登录吗').then(() => {
      userStore.logout()
    })
    return
  }
  // 移动端下跳转类型
  appStore.routerType = 'push'
  router.push(item.path)
}
</script>

<template>
  <m-popover placement="bottom-left" class="guide-my">
    <template #reference>
      <div
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 hover:bg-zinc-100/60 outline-none dark:hover:bg-zinc-900"
        v-if="userStore.token"
      >
        <!-- 用户头像 -->
        <img
          v-lazy
          class="w-3 h-3 rounded-sm"
          :src="userStore.userInfo.avatar"
          onerror="this.src='https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b';this.οnerrοr=null"
        />
        <!-- 箭头 -->
        <m-svg-icon
          name="down-arrow"
          class="w-1.5 h-1.5 ml-0.5"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
        <!-- vip -->
        <m-svg-icon
          v-if="userStore.userInfo.vipLevel"
          name="vip"
          class="w-1.5 h-1.5 absolute right-[16px] bottom-0"
        ></m-svg-icon>
      </div>
      <div
        v-else
        class="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 hover:bg-zinc-100/60 outline-none dark:hover:bg-zinc-900"
      >
        <m-button
          icon="profile"
          icon-color="#fff"
          @click="onLoginClick"
        ></m-button>
      </div>
    </template>
    <!-- 弹出层 -->
    <div v-if="userStore.token" class="w-[110px] overflow-hidden">
      <div
        class="hover:bg-zinc-100/60 dark:hover:bg-zinc-700 flex items-center p-1 rounded cursor-pointer duration-200"
        v-for="item in themeArr"
        :key="item.id"
        @click="onItemClick(item)"
      >
        <m-svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fill-class="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
        <span class="text-zinc-800 dark:text-zinc-200 text-sm">{{
          item.title
        }}</span>
      </div>
    </div>
  </m-popover>
</template>

<style lang="scss" scoped></style>
