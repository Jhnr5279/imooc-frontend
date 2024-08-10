<script setup lang="ts"></script>

<template>
  <div
    class="xl:grid xl:grid-cols-2 bg-white dark:bg-zinc-800 h-screen duration-200"
  >
    <div class="hidden xl:block">
      <img
        src="/src/assets/images/loginbg.jpg"
        class="h-screen"
        width="750px"
      />
    </div>
    <div
      class="py-6 xl:p-8 xl:h-[600px] h-screen flex items-center my-auto duration-200"
    >
      <div
        class="w-[80%] text-center mx-auto bg-zinc-50 dark:bg-zinc-700 rounded p-3 shadow-lg relative"
      >
        <m-svg-icon
          name="logo"
          class="xl:w-6 xl:h-6 w-4 h-4 inline-block"
          fill-class="fill-zinc-900 dark:fill-zinc-100"
        ></m-svg-icon>
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
