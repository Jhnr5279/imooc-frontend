<script setup lang="ts">
import { useSearchStore } from '@/stores/modules/search'
import { confirm } from '@/libs'
const historyStore = useSearchStore()

const emits = defineEmits(['onItemClick'])

/**
 * 历史记录全部删除
 */
const onDeleteAll = () => {
  confirm('确定要删除所有记录吗？')
    .then(() => {
      historyStore.clearHistory()
    })
    .catch(() => {
      console.log('取消删除')
    })
}

/**
 * 删除单个历史记录
 * @param index
 */
const onDeleteOne = (index: number) => {
  historyStore.deleteHistory(index)
}

/**
 * 历史记录点击
 * @param item
 */
const onItemClick = (item: string) => {
  emits('onItemClick', item)
}
</script>

<template>
  <div>
    <div class="flex items-center mb-1 text-gray-400">
      <span class="text-sm cursor-default">最近搜索</span>
      <m-svg-icon
        name="delete"
        class="w-2.5 h-2.5 ml-1 cursor-pointer duration-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 p-0.5 rounded-sm"
        fill-class="fill-zinc-400"
        @click="onDeleteAll"
      ></m-svg-icon>
    </div>
    <div class="flex flex-wrap">
      <div
        v-for="(item, index) in historyStore.searchHistory"
        :key="index"
        class="mr-2 px-1.5 py-0.5 text-sm font-bold dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 cursor-pointer rounded-sm flex items-center"
        @click="onItemClick(item)"
      >
        <span>{{ item }}</span>
        <m-svg-icon
          name="input-delete"
          class="w-2.5 h-2.5 p-0.5 ml-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 duration-200 rounded-sm"
          @click.stop="onDeleteOne(index)"
        ></m-svg-icon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
