<script setup lang="ts">
import { getTheme } from '@/api/pexels'
import { randomRGB } from '@/utils/color'

const themeData = ref<{
  big: ThemeType
  list: ThemeType[]
}>({
  big: {} as ThemeType,
  list: []
})
const getThemeData = async () => {
  const { themes } = await getTheme()
  themeData.value.big = themes[0]
  themeData.value.list = themes.slice(1, themes.length)
}
getThemeData()
</script>

<template>
  <div>
    <div class="text-sm text-zinc-400 my-1">热门精选</div>
    <div class="flex h-[140px]" v-if="themeData.list.length">
      <!-- 左侧大图 -->
      <div
        class="relative w-[260px] rounded cursor-pointer"
        :style="{ backgroundColor: randomRGB() }"
      >
        <img
          v-lazy
          class="rounded w-full h-full object-cover"
          :src="themeData.big.photo"
        />
        <p
          class="absolute bottom-0 left-0 flex items-center px-1 text-white text-sm backdrop-blur w-full h-[45%] rounded duration-300 hover:backdrop-blur-none"
        >
          # {{ themeData.big.title }}
        </p>
      </div>
      <!-- 右侧小图 -->
      <div class="flex flex-1 flex-wrap max-w-[860px]">
        <div
          v-for="item in themeData.list"
          :key="item.id"
          class="w-[260px] h-[45%] relative text-xs ml-1.5 mb-1.5 rounded cursor-pointer"
        >
          <img
            v-lazy
            class="w-full h-full object-cover rounded"
            :src="item.photo"
            alt=""
          />
          <p
            class="absolute top-0 left-0 flex items-center px-1 text-white text-sm backdrop-blur w-full h-full rounded duration-300 hover:backdrop-blur-none"
          >
            # {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
