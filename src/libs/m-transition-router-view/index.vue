<script lang="ts">
export type routerType = 'none' | 'push' | 'back'
const NONE = 'none'
const ROUTER_TYPE_PUSH = 'push'
const ROUTER_TYPE_BACK = 'back'
const ROUTER_TYPE_ENUM = [ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK, NONE]
</script>

<script setup lang="ts">
import { isMobileTerminal } from '@/utils/flexibel'

const props = defineProps({
  routerType: {
    type: String as () => routerType,
    default: NONE,
    validator(val: string) {
      const result = ROUTER_TYPE_ENUM.includes(val)
      if (!result) {
        throw new Error(
          `routerType must be one of ${ROUTER_TYPE_ENUM.join('、')}`
        )
      }
      return result
    }
  },
  // 首页的组件名称，对应任务栈中的第一个组件
  mainComponentName: {
    type: String,
    required: true
  }
})

/**
 * 监听 router 的前置守卫
 */
const router = useRouter()
const transitionName = ref('')
router.beforeEach((to, from) => {
  transitionName.value = props.routerType

  if (props.routerType === ROUTER_TYPE_PUSH) {
    // 入栈
    virtualTaskStack.value.push(to.name as string)
  } else if (props.routerType === ROUTER_TYPE_BACK) {
    // 出栈
    virtualTaskStack.value.pop()
  }

  if (to.name === props.mainComponentName) {
    clearTask()
  }
})

// 处理动画状态
const isAnimation = ref(false)
const beforEnter = () => {
  isAnimation.value = true
}
const afterLeave = () => {
  isAnimation.value = false
}

// 虚拟任务栈的数组，用来表示栈操作
const virtualTaskStack = ref<string[]>([props.mainComponentName])

/**
 * 清空栈
 */
const clearTask = () => {
  virtualTaskStack.value = [props.mainComponentName]
}
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition
      :name="transitionName"
      @before-enter="beforEnter"
      @after-leave="afterLeave"
    >
      <keep-alive :include="virtualTaskStack">
        <component
          :class="{
            'fixed top-0 left-0 w-screen': isAnimation
          }"
          :is="Component"
          :key="$route.fullPath"
        />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.5s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.5s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-50%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.5s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.5s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(50%, 0);
  }
}
</style>
