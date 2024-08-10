<script setup lang="ts">
import { getCaptcha } from '@/api/sys'
import '@/vendor/SliderCaptcha/longbow.slidercaptcha.min.js'
import '@/vendor/SliderCaptcha/slidercaptcha.min.css'

const emits = defineEmits(['onSuccess', 'onClose'])

/**
 * 使用人类行为验证:
 * 1.创建captcha 示例
 */
let captcha: any = null
onMounted(() => {
  // @ts-expect-error
  captcha = sliderCaptcha({
    id: 'captcha',
    // 验证成功
    async onSuccess(arr: number[]) {
      const res = await getCaptcha({
        behavior: arr
      })
      if (res) {
        emits('onSuccess')
      }
    },
    // 验证失败
    onFail() {
      console.log('onfail')
    },
    // 默认验证方法
    verify() {
      return true
    }
  })
})

/**
 * 重置
 */
const onReset = () => {
  captcha.reset()
}

/**
 * 关闭
 */
const onClose = () => {
  emits('onClose')
}
</script>

<template>
  <div
    class="absolute top-[10%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <m-svg-icon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></m-svg-icon>
      <m-svg-icon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></m-svg-icon>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<style lang="scss" scoped></style>
