import { useIntersectionObserver } from '@vueuse/core'

export default {
  // 图片懒加载，当图片进入可视区域时，加载图片
  mounted(el: HTMLImageElement) {
    const imageSrc = el.src
    el.src = ''
    el.style.opacity = '0'
    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        el.src = imageSrc
        el.style.opacity = '1'
        stop()
      }
    })
  }
}
