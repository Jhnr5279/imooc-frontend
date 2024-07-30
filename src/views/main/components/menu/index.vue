<script setup lang="ts">
import { useNavbarStore } from '@/stores'

const store = useNavbarStore()
defineEmits(['onItemClick'])
</script>

<template>
  <div class="h-[80vh] text-zinc-900 flex flex-col py-2 dark:text-zinc-200">
    <h2 class="text-xl font-bold px-2 mb-2">所有分类</h2>
    <ul class="overflow-y-auto">
      <li
        class="text-lg py-1.5 px-2 active:bg-zinc-100 dark:active:bg-zinc-900"
        v-for="item in store.categoryData"
        :key="item.id"
        @click="$emit('onItemClick', item)"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
