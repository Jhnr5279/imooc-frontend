<script setup lang="ts">
import { getHint } from '@/api/pexels'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  searchText: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['itemClick'])

const hintList = ref<string[]>([])
const onSearch = async () => {
  if (!props.searchText) return

  const { result } = await getHint(props.searchText)
  hintList.value = result
}

// vueuse 的防抖工具 功能跟 watch 一样，但是可以定义防抖时间
watchDebounced(() => props.searchText, onSearch, {
  immediate: true,
  debounce: 500
})

const onItemClick = (item: string) => {
  emits('itemClick', item)
}

/**
 * 处理关键字高亮
 */
const heightlightText = (text: string) => {
  // 生成高亮文本
  const heightlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 生成替换正则
  const reg = new RegExp(props.searchText, 'gi')
  return text.replace(reg, heightlightStr)
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in hintList"
      :key="index"
      class="py-1 pl-1 text-base font-bold text-zinc-400 rounded-sm duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer"
      v-html="heightlightText(item)"
      @click="onItemClick(item)"
    ></div>
  </div>
</template>

<style lang="scss" scoped></style>
