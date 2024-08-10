<script setup lang="ts">
import { useAppStore } from './stores'

const appStore = useAppStore()
</script>

<template>
  <!-- 一级路由出口 -->
  <div class="h-screen w-screen fixed top-0 left-0">
    <m-transition-router-view
      :router-type="appStore.getRouterType"
      main-component-name="home"
    ></m-transition-router-view>
  </div>
</template>

<style lang="scss"></style>
