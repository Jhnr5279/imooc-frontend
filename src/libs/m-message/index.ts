import { render } from 'vue'
import messageVue, { type enumType } from './index.vue'

/**
 *  message 组件提示
 * @param type 消息类型
 * @param text 消息内容
 * @param duration 关闭时间
 */
export const message = (
  type: enumType,
  content: string,
  duration: number = 2000
) => {
  const onDestroy = () => {
    render(null, document.body)
  }

  const vnode = h(messageVue, {
    type,
    content,
    duration,
    destroy: onDestroy
  })
  render(vnode, document.body)
}
