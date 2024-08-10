<script setup lang="ts">
import { getPexelById } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexibel'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const pexelData = ref({} as PexelType)
const getPexelData = async () => {
  const res = await getPexelById(props.id)
  pexelData.value = res
}
getPexelData()

/**
 * 关闭按钮处理事件
 */
const router = useRouter()
const onPop = () => {
  router.go(-1)
}
</script>

<template>
  <div
    class="fixed left-0 top-0 w-screen h-screen text-xl z-20 backdrop-blur-4xl overflow-y-auto duration-200 xl:p-8"
  >
    <!-- 移动端navbar -->
    <m-navbar v-if="isMobileTerminal" :right-click="onPop" :sticky="true">
      {{ pexelData.title }}
      <template #right>
        <m-svg-icon
          name="share"
          class="w-2.5 h-2.5 fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </template>
    </m-navbar>
    <!-- pc端关闭按钮 -->
    <m-svg-icon
      v-else
      name="close"
      class="w-4 h-4 p-1 absolute right-2 top-2 fill-zinc-900 dark:fill-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-900 rounded-full"
      @click="onPop"
    ></m-svg-icon>

    <!-- 内容区 -->
    <div
      v-if="pexelData.photo"
      class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex"
    >
      <img
        class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg"
        :src="pexelData.photo"
      />
      <div
        class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg xl:p-3"
      >
        <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
          <m-svg-icon
            name="share"
            class="w-4 h-4 p-1 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 duration-300 rounded"
            fillClass="fill-zinc-900 dark:fill-zinc-200"
          ></m-svg-icon>

          <m-button
            class=""
            type="info"
            icon="heart"
            iconClass="fill-zinc-900 dark:fill-zinc-200"
          />
        </div>
        <!-- 标题 -->
        <p
          class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5"
        >
          {{ pexelData.title }}
        </p>
        <!-- 作者 -->
        <div class="flex items-center mt-1 p-1">
          <img
            v-lazy
            class="h-3 w-3 rounded-full"
            :src="pexelData.avatar"
            alt=""
          />
          <span class="text-base text-zinc-900 dark:text-zinc-200 ml-1">{{
            pexelData.author
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
