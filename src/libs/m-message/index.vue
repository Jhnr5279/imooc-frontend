<script lang="ts">
export type enumType = `${tpyeEnum}`
enum tpyeEnum {
  success = 'success',
  error = 'error',
  warn = 'warn'
}

const styles = {
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  },
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  }
}
</script>
<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as () => enumType,
    required: true,
    default: tpyeEnum.success,
    validator(val: tpyeEnum) {
      const result = Object.values(tpyeEnum).includes(val)
      if (!result) {
        throw new Error(
          `你的 type 必须是 ${Object.values(tpyeEnum).join('、')} 中的一个`
        )
      }
      return result
    }
  },
  // 描述文本
  content: {
    type: String,
    required: true
  },
  // 展示时长
  duration: {
    type: Number
  },
  //关闭时的回调
  destroy: {
    type: Function
  }
})

const isVisable = ref(false)

onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
  }, props.duration)
})
</script>

<template>
  <transition name="down" @afterLeave="props.destroy!()">
    <div
      v-show="isVisable"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex items-center px-3 py-1.5 rounded-sm border cursor-pointer"
      :class="styles[type].containerClass"
    >
      <m-svg-icon
        :name="styles[type].icon"
        :fillClass="styles[type].fillClass"
        class="h-1.5 w-1.5 mr-1.5"
      ></m-svg-icon>
      <span class="text-sm" :class="styles[type].textClass">
        {{ content }}
      </span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.down-enter-active,
.down-leave-active {
  transition: all 0.5s;
}

.down-enter-from,
.down-leave-to {
  opacity: 0;
  transform: translate3d(-50%, -100px, 0);
}
</style>
