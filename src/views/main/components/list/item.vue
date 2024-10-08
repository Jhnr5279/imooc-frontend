<script setup lang="ts">
import { message } from '@/libs'
import { randomRGB } from '@/utils/color'
import { useElementBounding, useFullscreen } from '@vueuse/core'
import { saveAs } from 'file-saver'

const props = defineProps({
  data: {
    type: Object as () => PexelsDataType,
    required: true
  },
  width: {
    type: Number
  }
})

const emits = defineEmits(['onClick'])

const rgb = randomRGB()

/**
 * 下载按钮点击事件
 */
const onDownload = () => {
  message('success', '图片开始下载')
  setTimeout(() => {
    saveAs(props.data.photoDownLink)
  }, 100)
}

/**
 * 生成全屏方法
 */
const imgTarget = ref<HTMLImageElement | null>(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)

/**
 * 计算图片中心点，动画以中心点开始（x|y 位置 + 宽高/2)
 */
const {
  x: imgContainerX,
  y: imgContainerY,
  width: imgContainerWidht,
  height: imgContainerHeight
} = useElementBounding(imgTarget)
const imgContainerCenter = computed(() => {
  return {
    translateX: Math.floor(imgContainerX.value + imgContainerWidht.value / 2),
    translateY: Math.floor(imgContainerY.value + imgContainerHeight.value / 2)
  }
})

const onToPinsClick = () => {
  emits('onClick', {
    id: props.data.id,
    location: imgContainerCenter.value
  })
}
</script>

<template>
  <div
    class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1 duration-500"
    @click="onToPinsClick"
  >
    <div
      class="relative w-full rounded cursor-zoom-in group duration-200"
      :style="{ backgroundColor: rgb }"
    >
      <!-- 图片 -->
      <img
        v-lazy
        ref="imgTarget"
        class="rounded w-full bg-transparent"
        :src="data.photo"
        :style="{
          height: width
            ? (width / data.photoWidth) * data.photoHeight + 'px'
            : ''
        }"
      />
      <!-- 遮罩层 -->
      <div
        class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block"
      >
        <!-- 分享 -->
        <m-button class="absolute top-1.5 left-1.5">分享</m-button>
        <!-- 喜欢 -->
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!-- 下载 -->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        />
        <!-- 全屏 -->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullScreen"
        />
      </div>
    </div>
    <!-- 标题 -->
    <p
      class="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1"
    >
      {{ data.title }}
    </p>
    <!-- 作者信息 -->
    <div class="flex items-center mt-1 px-1">
      <img v-lazy class="h-2 w-2 rounded-full" :src="data.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ data.author }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
