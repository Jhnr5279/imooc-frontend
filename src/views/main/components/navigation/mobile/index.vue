<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import MenuVue from '@/views/main/components/menu/index.vue'
import { useNavbarStore } from '@/stores'
import { useAppStore } from '@/stores'

// pinia
const navbarStore = useNavbarStore()
navbarStore.setCategoryData()
const appStore = useAppStore()

const sliderRef = ref<HTMLLIElement | null>(null)
const sliderStyle = ref({
  width: '50px',
  transform: 'translateX(0px)'
})

// 选中的item下标
let itemRefs = [] as HTMLLIElement[]
const setItemsRef = (el: any) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => {
  itemRefs = []
})

// 获取 ul 元素，用以计算偏移位置
const ulTarget = ref<HTMLUListElement | null>(null)
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(
  () => appStore.currentCategoryIndex(),
  (val) => {
    const { left, width } = itemRefs[val].getBoundingClientRect()
    sliderStyle.value = {
      width: `${width}px`,
      transform: `translateX(${left + ulScrollLeft.value - 10}px)`
    }
  }
)

const showPopup = ref(false)
const showPopupClick = () => {
  showPopup.value = true
}

const onItemClick = (item: CategoryDataType) => {
  appStore.currentCategory = item
  showPopup.value = false
}
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10 dark:bg-zinc-800">
    <ul
      ref="ulTarget"
      class="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden dark:text-zinc-200"
    >
      <li
        ref="sliderRef"
        class="absolute h-[24px] duration-200 bg-zinc-900 rounded-lg dark:bg-zinc-900"
        :style="sliderStyle"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        @click="showPopupClick"
        class="z-20 fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 shadow-l-white dark:shadow-l-zinc"
      >
        <m-svg-icon class="w-1.5 h-1.5" name="hamburger"></m-svg-icon>
      </li>
      <li
        v-for="(item, index) in navbarStore.categoryData"
        :key="item.id"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
        :class="{
          'text-zinc-100 dark:text-zinc-300':
            appStore.currentCategoryIndex() === index
        }"
        :ref="setItemsRef"
        @click="onItemClick(item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <m-popup v-model="showPopup">
    <MenuVue @on-item-click="onItemClick" />
  </m-popup>
</template>

<style lang="scss" scoped></style>
