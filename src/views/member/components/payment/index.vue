<script setup lang="ts">
import { isMobileTerminal } from '@/utils/flexibel'
import PcPayment from './pc-payment/index.vue'
import MobilePayment from './mobile-payment/index.vue'

defineProps({
  payData: Object as () => VipListType
})
</script>

<template>
  <!-- pc端支付组件 -->
  <PcPayment v-if="!isMobileTerminal" :payData="payData"></PcPayment>
  <!-- 移动端支付组件 -->
  <MobilePayment v-else :payData="payData"></MobilePayment>
</template>

<style lang="scss" scoped></style>
