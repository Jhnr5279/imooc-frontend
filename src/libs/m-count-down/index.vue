<script lang="ts">
const EMITS_FINISH = 'finish'
const EMITS_CHANGE = 'change'
const INTERVAL_COUNT = 1000
</script>
<script setup lang="ts">
import dayjs from './utils'

const props = defineProps({
  // 开始时间戳
  time: {
    type: Number,
    required: true
  },
  // 时间格式
  format: {
    type: String,
    default: 'HH:mm:ss'
  }
})

const emits = defineEmits([EMITS_CHANGE, EMITS_FINISH])

let interval: number
/**
 * 开始倒计时
 */
const start = () => {
  close()
  interval = setInterval(() => {
    durationFn()
  }, INTERVAL_COUNT)
}
// 倒计时时长
const duration = ref(0)
/**
 * 倒计时行为
 */
const durationFn = () => {
  duration.value -= INTERVAL_COUNT
  emits(EMITS_CHANGE)
  if (duration.value <= 0) {
    duration.value = 0
    emits(EMITS_FINISH)
    close()
  }
}

/**
 * 关闭倒计时
 */
const close = () => {
  if (interval) {
    clearInterval(interval)
  }
}

/**
 * 组件卸载时
 */
onUnmounted(() => {
  close()
})

/**
 * 开始倒计时
 */
watch(
  () => props.time,
  (val) => {
    duration.value = val
    start()
  },
  {
    immediate: true
  }
)

const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
})
</script>

<template>
  <div>
    <slot>
      <p class="text-sm">
        {{ showTime }}
      </p>
    </slot>
  </div>
</template>

<style lang="scss" scoped></style>
