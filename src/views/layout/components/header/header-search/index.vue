<script setup lang="ts">
import { useSearchStore } from '@/stores/modules/search'
import HintVue from './hint.vue'
import History from './history.vue'
import Theme from './theme.vue'
import { useAppStore } from '@/stores'

const inputValue = ref('')
const searchStory = useSearchStore()
const appStroe = useAppStore()
const onSearchHandler = (val: string) => {
  inputValue.value = val
  if (val) {
    searchStory.addHistory(val)
    appStroe.changeSearchText(val)
  }
}
</script>

<template>
  <div class="w-full guide-search">
    <m-search v-model="inputValue" @search="onSearchHandler">
      <template #dropdown>
        <HintVue
          v-show="inputValue"
          :search-text="inputValue"
          @item-click="onSearchHandler"
        ></HintVue>
        <History
          v-show="!inputValue"
          @on-item-click="onSearchHandler"
        ></History>
        <Theme v-show="!inputValue"></Theme>
      </template>
    </m-search>
  </div>
</template>

<style lang="scss" scoped></style>
