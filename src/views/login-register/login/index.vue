<script lang="ts">
export default {
  name: 'login'
}
</script>

<script setup lang="ts">
import container from '../components/container.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage
} from 'vee-validate'
import { validatePassword, validateUsername } from '../validate'
import SliderCaptcha from './slider-captcha.vue'
import { useUserStore } from '@/stores/modules/user'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useAppStore } from '@/stores'
import qqLoginVue from './qq-login.vue'

const isVisableCaphtcha = ref(false)

const onLoginHandler = () => {
  isVisableCaphtcha.value = true
}

const onCaphtchaSuccess = () => {
  isVisableCaphtcha.value = false
  onLogin()
}

const router = useRouter()
const appStore = useAppStore()
const onToRegister = () => {
  // 移动端下跳转类型
  appStore.routerType = 'push'
  router.push('/register')
}

/**
 * 登录操作
 */
const loading = ref(false)
const loginForm = ref({
  username: '',
  password: ''
})
const userStore = useUserStore()
const onLogin = async () => {
  loading.value = true
  try {
    await userStore.useLoginUser({
      ...loginForm.value,
      loginType: LOGIN_TYPE_USERNAME
    })
  } finally {
    loading.value = false
  }
  router.push('/')
}
</script>

<template>
  <container>
    <!-- 表单 -->
    <vee-form
      class="flex flex-wrap flex-col gap-1 my-2 py-1 h-1/2 w-full"
      @submit="onLoginHandler"
    >
      <vee-field
        type="text"
        name="username"
        v-model="loginForm.username"
        class="focus:border-red-200 dark:focus:border-zinc-400 duration-300 w-full h-4 border outline-none text-base p-1 rounded dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-900"
        placeholder="请输入用户名"
        :rules="validateUsername"
      />
      <vee-error-message
        name="username"
        class="text-red-400 text-sm text-start px-1"
      />

      <vee-field
        type="password"
        name="password"
        v-model="loginForm.password"
        class="duration-200 focus:border-red-200 dark:focus:border-zinc-400 mt-1 w-full h-4 border outline-none text-base p-1 rounded dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-900"
        placeholder="输入密码"
        :rules="validatePassword"
      />
      <vee-error-message
        name="password"
        class="text-red-400 text-sm text-start px-1"
      />

      <div class="text-sm text-end text-zinc-400">
        <a
          class="cursor-pointer hover:text-red-300 dark:hover:text-zinc-200"
          @click="onToRegister"
          >注册&rarr;</a
        >
      </div>
      <m-button
        class="w-full h-4 mt-2"
        :loading="loading"
        :is-active-anim="false"
        >登 录</m-button
      >
    </vee-form>

    <!-- 第三方登录 -->
    <div class="flex justify-around mt-2">
      <!-- QQ -->
      <qq-login-vue></qq-login-vue>
      <!-- 微信 -->
      <m-svg-icon class="w-4 h-4 cursor-pointer" name="wexin"></m-svg-icon>
    </div>
    <SliderCaptcha
      v-if="isVisableCaphtcha"
      @on-success="onCaphtchaSuccess"
      @on-close="isVisableCaphtcha = false"
    />
  </container>
</template>

<style lang="scss" scoped></style>
