<script lang="ts">
export default {
  name: 'pc-navbar'
}
</script>

<script setup lang="ts">
import { useNavbarStore } from '@/stores'
import { useAppStore } from '@/stores'

const navbarStore = useNavbarStore()
navbarStore.setCategoryData()

const isFold = ref(false)

const appStore = useAppStore()
const onItemClick = (item: CategoryDataType) => {
  appStore.currentCategory = item
}
</script>

<template>
  <div
    class="bg-white sticky top-0 left-0 w-full z-10 dark:bg-zinc-800 duration-500"
  >
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto"
      :class="[isFold ? 'h-[206px]' : 'h-[56px]']"
    >
      <!-- lg 下展开箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="isFold = !isFold"
      >
        <m-svg-icon
          :name="isFold ? 'fold' : 'unfold'"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </div>
      <!-- category item -->
      <li
        v-for="(item, index) in navbarStore.categoryData"
        :key="item.id"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900 dark:text-zinc-200 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded mr-1 mb-1"
        @click="onItemClick(item)"
        :class="{
          'bg-zinc-200 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-200':
            appStore.currentCategoryIndex() === index
        }"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
