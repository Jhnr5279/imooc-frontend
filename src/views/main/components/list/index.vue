<script setup lang="ts">
import { isMobileTerminal } from '@/utils/flexibel'
import ItemVue from './item.vue'
import { getPexelsList, type pexelsParamsType } from '@/api/pexels'
import { useAppStore } from '@/stores'
import pins from '@/views/pins/components/pins.vue'
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core'

let query = {
  page: 1,
  size: 20
}

const isloading = ref(false)
const isFinished = ref(false)

const pexelsList = ref<PexelsDataType[]>([])
const getPexels = async () => {
  if (isFinished.value) return
  if (pexelsList.value.length) {
    query.page++
  }
  const res = await getPexelsList(query)
  pexelsList.value.push(...res.list)

  if (pexelsList.value.length >= res.total) {
    isFinished.value = true
  }
  isloading.value = false
}

const reset = (newQuery: pexelsParamsType) => {
  query = { ...query, ...newQuery }
  isFinished.value = false
  pexelsList.value = []
}

const appStore = useAppStore()
/**
 * 分类和列表联动
 */
watch(
  () => appStore.currentCategory,
  (newCategory) => {
    reset({ page: 1, categoryId: newCategory.id })
  }
)

/**
 * 搜索框联动
 */
watch(
  () => appStore.searchText,
  (newText) => {
    reset({ page: 1, searchText: newText })
  }
)

/**
 * 监听路由变化，关闭详情页
 */
useEventListener('popstate', () => {
  isVisableSpins.value = false
})

/**
 * 模拟路由跳转详情页，实现动画效果
 */
type PinsResType = {
  id: string
  location: { translateX: number; translateY: number }
}
const isVisableSpins = ref(false)
const currentSpins = ref({} as PinsResType)
const onItemClick = (item: PinsResType) => {
  isVisableSpins.value = true
  history.pushState(null, '', `/pins/${item.id}`)
  currentSpins.value = item
}

const beforEnter = (el: HTMLDivElement) => {
  gsap.set(el, {
    scaleX: 0,
    scaleY: 0,
    transformOrigin: '0 0',
    x: currentSpins.value.location?.translateX,
    y: currentSpins.value.location?.translateY,
    opacity: 0
  })
}
const onEnter = (el: HTMLDivElement, down: any) => {
  gsap.to(el, {
    scaleX: 1,
    scaleY: 1,
    opacity: 1,
    x: 0,
    y: 0,
    duration: 0.3,
    onComplete: down
  })
}
const onLeave = (el: HTMLDivElement, down: any) => {
  gsap.to(el, {
    scaleX: 0,
    scaleY: 0,
    opacity: 0,
    translateX: currentSpins.value.location?.translateX,
    translateY: currentSpins.value.location?.translateY,
    duration: 0.3,
    onComplete: down
  })
}
</script>

<template>
  <m-infinite
    v-model="isloading"
    :is-finished="isFinished"
    @on-load="getPexels"
  >
    <m-waterfall
      class="px-1 w-full"
      :data="pexelsList"
      :column="isMobileTerminal ? 2 : 5"
      node-key="id"
      :picture-pre-reading="false"
    >
      <template #default="{ item, width }">
        <ItemVue :data="item" :width="width" @on-click="onItemClick"></ItemVue>
      </template>
    </m-waterfall>
    <transition
      :css="false"
      @before-enter="beforEnter!"
      @enter="onEnter!"
      @leave="onLeave!"
    >
      <pins :id="currentSpins.id" v-if="isVisableSpins" />
    </transition>
  </m-infinite>
</template>

<style lang="scss" scoped></style>
