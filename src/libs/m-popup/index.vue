<script setup lang="ts">
import { useScrollLock } from '@vueuse/core'

const isShow = defineModel({
  type: Boolean,
  required: true
})

const isLocked = useScrollLock(document.body)
watch(
  isShow,
  (val) => {
    isLocked.value = val
  },
  {
    immediate: true
  }
)
</script>

<template>
  <div>
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="isShow"
          @click="isShow = false"
          class="fixed top-0 left-0 w-screen h-screen bg-black/60 z-20"
        ></div>
      </transition>

      <transition name="popup-down-up">
        <div
          v-if="isShow"
          v-bind="$attrs"
          class="fixed bottom-0 left-0 bg-white dark:bg-zinc-800 w-screen rounded-t-md z-30"
        >
          <slot />
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
// fade 展示动画
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// popup-down-up 展示动画
.popup-down-up-enter-active,
.popup-down-up-leave-active {
  transition: all 0.3s;
}

.popup-down-up-enter-from,
.popup-down-up-leave-to {
  transform: translateY(100%);
}
</style>
