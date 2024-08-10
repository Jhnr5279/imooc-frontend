<script lang="ts">
// 搜索事件
const SEARCH_EMIT = 'search'
// 聚焦事件
const FOCUS_EMIT = 'focus'
// 失去焦点事件
const BLUR_EMIT = 'blur'
// 清空事件
const CLEAR_EMIT = 'clear'
// 输入事件
const INPUT_EMIT = 'input'
</script>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const inputValue = defineModel({
  type: String,
  required: true
})

const emits = defineEmits([
  SEARCH_EMIT,
  FOCUS_EMIT,
  BLUR_EMIT,
  CLEAR_EMIT,
  INPUT_EMIT
])

/**
 * 监听输入框内容变化 发送输入事件
 */
watch(inputValue, (val: string) => {
  emits(INPUT_EMIT, val)
})

/**
 * 搜索事件
 */
const onSearchHandler = () => {
  emits(SEARCH_EMIT, inputValue.value)
}
/**
 * 清空输入框
 */
const onClearClick = () => {
  inputValue.value = ''
  emits(CLEAR_EMIT, '')
}

// 根据焦点控制 显示下拉框
const isFocus = ref(false)
const containerTarget = ref(null)
/**
 * 获取焦点
 */
const onFocusHandler = () => {
  isFocus.value = true
  emits(FOCUS_EMIT)
}

/**
 * 失去焦点
 */
const onBlurHandler = () => {
  emits(BLUR_EMIT)
}

// 点击外部区域，失去焦点 隐藏下拉框
onClickOutside(containerTarget, () => {
  isFocus.value = false
})
</script>

<template>
  <div
    class="group relative p-0.5 rounded-xl border-white dark:border-zinc-900 duration-500 hover:bg-red-100/40 dark:hover:bg-zinc-600"
    ref="containerTarget"
  >
    <div>
      <!-- 搜索图标 -->
      <m-svg-icon
        name="search"
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] left-2"
        color="#707070"
        fill-class="dark:fill-zinc-200"
      ></m-svg-icon>
      <!-- 搜索框 -->
      <input
        class="border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 block w-full h-[44px] rounded-xl pl-4 text-sm text-zinc-900 dark:text-zinc-200 caret-zinc-400 dark:caret-zinc-700 border duration-500 tracking-wide group-hover:bg-white group-hover:border-zinc-200 focus:border-red-300 font-semibold outline-none dark:group-hover:bg-zinc-800 dark:group-hover:border-zinc-600 dark:focus:border-zinc-800"
        type="text"
        placeholder="搜索"
        v-model="inputValue"
        @keypress.enter="onSearchHandler"
        @focus="onFocusHandler"
        @blur="onBlurHandler"
      />
      <!-- 清空按钮 -->
      <m-svg-icon
        name="input-delete"
        v-show="inputValue"
        @click="onClearClick"
        class="w-1.5 h-1.5 absolute top-[50%] translate-y-[-50%] right-7 duration-500 cursor-pointer"
      />
      <!-- 分割符 -->
      <div
        class="opacity-0 absolute top-[50%] translate-y-[-50%] right-[56px] duration-500 group-hover:opacity-100 h-1.5 w-[1px] bg-zinc-200"
      ></div>
      <!-- 搜索按钮 -->
      <m-button
        class="absolute opacity-0 top-[50%] translate-y-[-50%] right-1 rounded-full group-hover:opacity-100 duration-700"
        @click="onSearchHandler"
        icon="search"
        size="small"
        icon-color="white"
      ></m-button>
    </div>
    <!-- 下拉框 -->
    <transition name="slider">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white absolute z-20 left-0 top-[58px] p-2 rounded border shadow-lg border-zinc-200 duration-200 hover:shadow-2xl dark:bg-zinc-800 dark:border-zinc-700 dark:hover:shadow-zinc-700 scrollbar-thin scrollbar-track-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-corner-transparent"
      >
        <slot name="dropdown" />
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
