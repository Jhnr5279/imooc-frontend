import { PC_DEVICE_WIDTH } from '@/constants'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
/**
 * 通过页面宽度判断设备是否为移动设备 (默认1280px)
 */
// export const isMobileTerminal = computed(() => {
//   return width.value < PC_DEVICE_WIDTH
// })
/**
 * 判断当前是否为移动设备
 */
export const isMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

/**
 * 监听 html 渲染完成
 * 动态设置rem基准值，给html根标签设置fontsize
 * 最大值为 40px
 */
export const useRem = () => {
  const MAX_FONTSIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.querySelector('html')!
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONTSIZE ? MAX_FONTSIZE : fontSize
    html.style.fontSize = fontSize + 'px'
  })
}
