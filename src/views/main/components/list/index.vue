<script setup lang="ts">
import { isMobileTerminal } from '@/utils/flexibel'
import ItemVue from './item.vue'
import { getPexelsList, type pexelsParamsType } from '@/api/pexels'
import { useAppStore } from '@/stores'

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
watch(
  () => appStore.currentCategory,
  (newCategory) => {
    reset({ page: 1, categoryId: newCategory.id })
  }
)
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
        <ItemVue :data="item" :width="width"></ItemVue>
      </template>
    </m-waterfall>
  </m-infinite>
</template>

<style lang="scss" scoped></style>
