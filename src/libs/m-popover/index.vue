<script lang="ts">
enum placementEnum {
  PROP_TOP_LEFT = 'top-left',
  PROP_TOP_RIGHT = 'top-right',
  PROP_BOTTOM_LEFT = 'bottom-left',
  PROP_BOTTOM_RIGHT = 'bottom-right'
}
type placementType = `${placementEnum}`

const placementEnumArr = Object.values(placementEnum)
const DELAY_TIME = 100
</script>

<script setup lang="ts">
const props = defineProps({
  placement: {
    type: String as () => placementType,
    default: placementEnum.PROP_TOP_LEFT,
    validator(val: placementEnum) {
      const result = placementEnumArr.includes(val)
      if (!result) {
        throw new Error(
          `你的 placement 必须是 ${placementEnumArr.join('、')} 中的一个`
        )
      }
      return result
    }
  }
})

let timeOut: number | null
const isShow = ref(false)
/**
 * 鼠标移入事件
 */
const onMouseEnter = () => {
  isShow.value = true
  if (timeOut) {
    clearTimeout(timeOut)
  }
}
/**
 * 鼠标移出事件
 */
const onMouseLeave = () => {
  timeOut = setTimeout(() => {
    isShow.value = false
    timeOut = null
  }, DELAY_TIME)
}

const referenceTarget = ref<HTMLDivElement | null>(null)
const contentTarget = ref<HTMLDivElement | null>(null)
const useEelemtSize = (target: HTMLDivElement) => {
  if (!target) return {}
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}

const contentStyle = ref<{
  top: number | string
  left: number | string
}>({
  top: 0,
  left: -useEelemtSize(contentTarget.value!).width! + 'px'
})

watch(isShow, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      case placementEnum.PROP_TOP_LEFT:
        contentStyle.value = {
          top: 0,
          left: -useEelemtSize(contentTarget.value!).width! + 'px'
        }
        break
      case placementEnum.PROP_TOP_RIGHT:
        contentStyle.value = {
          top: 0,
          left: useEelemtSize(referenceTarget.value!).width! + 'px'
        }
        break
      case placementEnum.PROP_BOTTOM_LEFT:
        contentStyle.value = {
          top: useEelemtSize(referenceTarget.value!).height! + 'px',
          left: -useEelemtSize(contentTarget.value!).width! + 'px'
        }
        break
      case placementEnum.PROP_BOTTOM_RIGHT:
        contentStyle.value = {
          top: useEelemtSize(referenceTarget.value!).height! + 'px',
          left: useEelemtSize(referenceTarget.value!).width! + 'px'
        }
        break
    }
  })
})
</script>

<template>
  <div class="relative" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <div ref="referenceTarget">
      <!-- 具名插槽  触发弹出层的视图 -->
      <slot name="reference" />
    </div>

    <!-- 弹出层视图中展示的内容 -->
    <transition name="slider">
      <div
        v-if="isShow"
        ref="contentTarget"
        class="absolute bg-white dark:bg-zinc-900 dark:border-zinc-700 dark:hover:shadow-zinc-700 border rounded hover:shadow-md duration-200 z-20"
        :style="contentStyle"
      >
        <!-- 匿名插槽 -->
        <slot />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
slider-enter-active,
.slider-leave-active {
  transition: all 0.3s;
}
.slider-enter-from,
.slider-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
