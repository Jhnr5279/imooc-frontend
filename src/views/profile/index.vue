<script setup lang="ts">
import { putProfile } from '@/api/sys'
import { confirm, message } from '@/libs'
import { useAppStore, useUserStore } from '@/stores'
import { isMobileTerminal } from '@/utils/flexibel'
import changeAvatarVue from './components/change-avatar.vue'

const userStore = useUserStore()
const userInfo = ref({ ...userStore.userInfo })
const router = useRouter()

// 隐藏域
const inputFileTarget = ref<HTMLInputElement | null>(null)

/**
 * 移动端：后退
 */
const appStore = useAppStore()
const onNavbarLeftclick = () => {
  // 移动端下跳转类型
  appStore.routerType = 'back'
  router.back()
}

/**
 * 移动端：退出登录
 */
const onLogoutClick = () => {
  confirm('确定要退出登录吗？').then(() => {
    userStore.logout()
  })
}

// 控制 dialog 显示
const isDialogVisible = ref(false)
// 当前显示的图片
const currentImg = ref('')
const currentImgName = ref('')
/**
 * 选择头像
 */
const onAvatarClick = () => {
  inputFileTarget.value?.click()
}

/**
 * 选择头像回调
 */
const onSelectImgHandler = () => {
  const imgFile = inputFileTarget.value?.files![0]
  currentImgName.value = imgFile?.name!
  const blob = URL.createObjectURL(imgFile!)
  currentImg.value = blob
  isDialogVisible.value = true
}

watch(isDialogVisible, (val) => {
  if (inputFileTarget.value?.value && !val) {
    inputFileTarget.value.value = ''
  }
})

watch(
  () => userStore.userInfo.avatar,
  (newVal: string) => {
    userInfo.value.avatar = newVal
  }
)

/**
 * 修改个人信息
 */
const loading = ref(false)
const onChangeProfile = async () => {
  loading.value = true
  try {
    await putProfile(userInfo.value)
    message('success', '修改成功')
    userStore.setUserInfo(userInfo.value)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="h-full bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1"
  >
    <div
      class="relative max-w-screen-lg bg-white mx-auto dark:bg-zinc-900 duration-400 rounded shadow xl:mt-1 xl:border-[1px] xl:border-zinc-200 xl:dark:border-zinc-600 xl:px-4 xl:py-2"
    >
      <!-- 移动端 -->
      <m-navbar
        :sticky="true"
        v-if="isMobileTerminal"
        :left-click="onNavbarLeftclick"
      >
        个人资料
      </m-navbar>
      <!-- pc端 -->
      <div
        class="hidden xl:block text-lg font-bold text-center mb-4 dark:text-zinc-300"
      >
        个人资料
      </div>
      <div class="h-full w-full px-1 pb-4 text-sm mt-2 xl:w-2/3 xl:pb-0">
        <!-- 头像 -->
        <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
          <span
            class="text-base font-bold mb-2 inline-block xl:block dark:text-zinc-200"
            >我的头像</span
          >
          <!-- 头像部分 -->
          <div
            class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
            @click="onAvatarClick"
          >
            <img
              v-lazy
              :src="
                userInfo.avatar ??
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2F0c%2Fef%2Fa0%2F0cefa0f17b83255217eddc20b15395f9.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651074011&t=ba5d64079381425813e4c269bcac1a1b'
              "
              alt=""
              class="rounded-[50%] w-full h-full xl:inline-block"
            />
            <div
              class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block"
            >
              <m-svg-icon
                name="change-header-image"
                class="w-2 h-2 m-auto mt-2"
              ></m-svg-icon>
              <div
                class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5"
              >
                点击更换头像
              </div>
            </div>
          </div>
          <!-- 隐藏域 -->
          <input
            v-show="false"
            ref="inputFileTarget"
            type="file"
            accept=".png, .jpeg, .jpg, .gif"
            @change="onSelectImgHandler"
          />
          <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
            支持 jpg、png、jpeg 格式大小 5M 以内的图片
          </p>
        </div>
        <!-- 用户名 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >用户名</span
          >
          <m-input
            v-model="userInfo.nickname"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>
        <!-- 职位 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >职位</span
          >
          <m-input
            v-model="userInfo.title"
            class="w-full"
            type="text"
            max="20"
          ></m-input>
        </div>
        <!-- 公司 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >公司</span
          >
          <m-input
            v-model="userInfo.company"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人主页 -->
        <div class="py-1 xl:flex xl:items-center xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人主页</span
          >
          <m-input
            v-model="userInfo.homePage"
            class="w-full"
            type="text"
          ></m-input>
        </div>
        <!-- 个人介绍 -->
        <div class="py-1 xl:flex xl:my-1">
          <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0"
            >个人介绍</span
          >
          <m-input
            v-model="userInfo.introduction"
            class="w-full"
            type="textarea"
            max="50"
          ></m-input>
        </div>
        <!-- 保存修改 -->
        <m-button
          class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onChangeProfile"
          :loading="loading"
          >保存修改</m-button
        >
        <!-- 移动端退出登录 -->
        <m-button
          v-if="isMobileTerminal"
          class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
          @click="onLogoutClick"
        >
          退出登录
        </m-button>
      </div>
    </div>
    <m-dialog v-if="!isMobileTerminal" v-model="isDialogVisible">
      <change-avatar-vue
        :blob="currentImg"
        @close="isDialogVisible = false"
        @success="onChangeProfile"
      ></change-avatar-vue>
    </m-dialog>
    <m-popup
      v-else
      v-model="isDialogVisible"
      :class="{ 'h-4/5 ': isDialogVisible }"
    >
      <change-avatar-vue
        :blob="currentImg"
        @close="isDialogVisible = false"
        @success="onChangeProfile"
      ></change-avatar-vue>
    </m-popup>
  </div>
</template>

<style lang="scss" scoped></style>
