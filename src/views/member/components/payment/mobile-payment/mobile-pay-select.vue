<script setup lang="ts">
import { alipay } from '@/utils/pay'

const props = defineProps({
  payData: Object as () => VipListType
})

const onAlipayClick = () => {
  alipay(props.payData!.title, props.payData!.desc)
}
</script>

<template>
  <div
    class="h-[65vh] w-screen px-1 mt-2 bg-white dark:bg-zinc-800 dark:text-zinc-200"
  >
    <h2 class="text-xl font-bold">选择支付方式</h2>
    <ul class="mt-2">
      <li
        class="text-lg flex items-center p-1 border-b dark:border-b-zinc-700 active:bg-zinc-100 rounded dark:active:bg-zinc-900"
        @click="onAlipayClick"
      >
        <img src="@/assets/images/alipay.png" class="w-4 h-4" alt="" />
        <span class="ml-1">支付宝</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
