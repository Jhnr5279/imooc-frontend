<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  isFinished: {
    type: Boolean,
    default: false
  },
  text: {
    type: String,
    default: '没有更多内容了！'
  }
})

const loading = defineModel({ type: Boolean, required: true })

const loadingTarget = ref<HTMLDivElement | null>(null)
const isIntersectingTarget = ref(false)
const emit = defineEmits(['onLoad'])

useIntersectionObserver(loadingTarget, ([{ isIntersecting }]) => {
  // 使用vueuse的useIntersectionObserver方法监听loadingTarget的可见性
  // 当loadingTarget进入可视区域时，触发onLoad事件
  // 该事件在 目标元素未离开可视范围外时只会触发一次回调函数。
  isIntersectingTarget.value = isIntersecting
  emitLoad()
})

/**
 * onload事件
 */
const emitLoad = () => {
  setTimeout(() => {
    if (isIntersectingTarget.value && !loading.value && !props.isFinished) {
      loading.value = true
      emit('onLoad')
    }
  }, 100)
}

/**
 * watch 监听 loading
 */
watch(loading, emitLoad)
</script>

<template>
  <div>
    <!-- 内容 -->
    <slot />
    <div ref="loadingTarget" class="h-6 py-4">
      <!-- 加载更多 -->
      <m-svg-icon
        v-show="loading"
        name="infinite-load"
        class="w-4 h-4 mx-auto animate-spin"
      ></m-svg-icon>
      <!-- 没有更多内容 -->
      <p v-if="isFinished" class="text-center text-base text-zinc-400">
        {{ text }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
