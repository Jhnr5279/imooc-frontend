<script setup lang="ts">
import Floating from './components/floating.vue'
import HeaderVue from './components/header/index.vue'
import MainVue from './components/main.vue'
</script>

<template>
  <div class="h-screen">
    <header-vue class="h-header dark:bg-zinc-900"></header-vue>
    <div class="h-main">
      <main-vue> </main-vue>
    </div>
    <floating></floating>
  </div>
</template>

<style lang="scss" scoped></style>
