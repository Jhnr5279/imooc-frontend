<script setup lang="ts">
import Pins from './components/pins.vue'
</script>

<template>
  <div class="w-full h-full backdrop-blur-4xl bg-zinc-200 dark:bg-zinc-800">
    <Pins :id="($route.params.id as string)" />
  </div>
</template>

<style lang="scss" scoped></style>
