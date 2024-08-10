<script setup lang="ts">
import { driver, type Driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import steps from './header/steps'
import { FEEDBACK_URL } from '@/constants'

let driverObj: Driver
onMounted(() => {
  driverObj = driver({
    showProgress: true,
    progressText: '{{current}}/{{total}}',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '关闭'
  })
})

const onGuideClick = () => {
  driverObj.setSteps(steps)
  driverObj.drive()
}

const onToFeedback = () => {
  window.open(FEEDBACK_URL, '__black')
}
</script>

<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      class="guide-start w-4 h-4 p-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex items-center justify-center hover:shadow-lg group cursor-pointer"
      @click="onGuideClick"
    >
      <m-svg-icon
        name="guide"
        class="w-2 h-2"
        fill-class="group-hover:fill-main fill-zinc-900 dark:fill-zinc-200"
      ></m-svg-icon>
    </div>

    <!-- 反馈 -->
    <m-popover class="mt-1 guide-feedback">
      <template #reference>
        <div
          class="w-4 h-4 p-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex items-center justify-center hover:shadow-lg group cursor-pointer"
        >
          <m-svg-icon
            name="feedback"
            class="w-2 h-2"
            fill-class="group-hover:fill-main fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>
        </div>
      </template>
      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 text-sm cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onToFeedback"
        >
          <m-svg-icon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fill-class="fill-zinc-900 dark:fill-zinc-300"
          ></m-svg-icon>
          <span class="text-zinc-900 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </m-popover>
  </div>
</template>

<style lang="scss" scoped></style>
