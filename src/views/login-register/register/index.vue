<script lang="ts">
export default {
  name: 'login'
}
</script>

<script setup lang="ts">
import { useUserStore } from '@/stores/modules/user'
import {
  ErrorMessage as VeeErrorMessage,
  Field as VeeField,
  Form as VeeForm,
  defineRule
} from 'vee-validate'
import container from '../components/container.vue'
import {
  validatePassword,
  validateUsername,
  validateConfirmPassword
} from '../validate'
import { LOGIN_TYPE_USERNAME } from '@/constants'
import { useAppStore } from '@/stores'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const onToLogin = () => {
  // 移动端下跳转类型
  appStore.routerType = 'push'
  router.push('/login')
}

defineRule('validateConfirmPassword', validateConfirmPassword)

/**
 * 注册操作
 */
const loading = ref(false)
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const userStore = useUserStore()
const onRegister = async () => {
  loading.value = true
  const payload = {
    username: registerForm.value.username,
    password: registerForm.value.password
  }
  try {
    // 触发注册，携带第三方数据
    await userStore.register({
      ...payload,
      ...route.query
    })
    await userStore.useLoginUser({
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
    router.push('/')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <container>
    <!-- 表单 -->
    <vee-form
      class="flex flex-wrap flex-col gap-1 my-2 py-1 h-1/2 w-full"
      @submit="onRegister"
    >
      <vee-field
        type="text"
        name="username"
        v-model="registerForm.username"
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
        v-model="registerForm.password"
        class="duration-200 focus:border-red-200 dark:focus:border-zinc-400 mt-1 w-full h-4 border outline-none text-base p-1 rounded dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-900"
        placeholder="输入密码"
        :rules="validatePassword"
      />
      <vee-error-message
        name="password"
        class="text-red-400 text-sm text-start px-1"
      />

      <vee-field
        type="password"
        name="confirmPassword"
        v-model="registerForm.confirmPassword"
        class="duration-200 focus:border-red-200 dark:focus:border-zinc-400 mt-1 w-full h-4 border outline-none text-base p-1 rounded dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 dark:bg-zinc-900"
        placeholder="再次输入密码"
        rules="validateConfirmPassword:@password"
      />
      <vee-error-message
        name="confirmPassword"
        class="text-red-400 text-sm text-start px-1"
      />

      <div class="text-sm text-end text-zinc-400">
        <a
          class="cursor-pointer hover:text-red-300 dark:hover:text-zinc-200"
          @click="onToLogin"
          >登录&rarr;</a
        >
      </div>
      <div class="text-center">
        <a
          class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
          href="https://m.imooc.com/newfaq?id=89"
          target="__black"
        >
          注册即同意《网站注册协议》
        </a>
      </div>
      <m-button class="w-full h-4" :loading="loading" :is-active-anim="false"
        >立即注册</m-button
      >
    </vee-form>
  </container>
</template>

<style lang="scss" scoped></style>
