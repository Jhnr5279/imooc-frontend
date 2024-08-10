<script setup lang="ts">
const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 内容
  content: {
    type: String,
    required: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确认按钮文本
  confirmText: {
    type: String,
    default: '确认'
  },
  // 取消按钮事件
  cancelEvent: {
    type: Function
  },
  // 确认按钮事件
  confirmEvent: {
    type: Function
  },
  // 关闭事件回调
  close: {
    type: Function
  }
})

// 是否显示
const isVisable = ref(true)
const show = () => {
  isVisable.value = true
}

onMounted(() => {
  show()
})

// 动画时间
const duration = '0.5s'

/**
 * 取消事件
 */
const onCancelClick = () => {
  if (props.cancelEvent) {
    props.cancelEvent()
  }
  close()
}

/**
 * 确认事件
 */
const onConfirmClick = () => {
  if (props.confirmEvent) {
    props.confirmEvent()
  }
  close()
}

/**
 * 关闭事件
 */
const close = () => {
  isVisable.value = false
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '')) * 100)
}
</script>

<template>
  <div>
    <transition name="fade">
      <div
        v-if="isVisable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </transition>
    <transition name="up">
      <div
        v-if="isVisable"
        class="w-[80%] fixed top-1/3 left-1/2 -translate-x-1/2 z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{
            cancelText
          }}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{
            confirmText
          }}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all v-bind(duration);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
