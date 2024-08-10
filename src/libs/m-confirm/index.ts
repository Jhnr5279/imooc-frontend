import { render } from 'vue'
import confirmComponent from './index.vue'

export const confirm = (
  title?: string,
  content?: string,
  cancelText: string = '取消',
  confirmText: string = '确定'
) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title
      title = ''
    }
    /**
     * cancelEvent 取消按钮事件
     */
    const cancelEvent = () => {
      reject(new Error('取消'))
    }
    /**
     * confirmEvent 确定按钮事件
     */
    const confirmEvent = () => {
      resolve('')
    }
    /**
     * close 关闭弹窗
     */
    const close = () => {
      // 移除虚拟dom
      render(null, document.body)
    }
    // h 函数 生成虚拟dom
    const vnode = h(confirmComponent, {
      title,
      content: content!,
      cancelText,
      confirmText,
      cancelEvent,
      confirmEvent,
      close
    })
    // render 函数 将虚拟dom 渲染到页面
    render(vnode, document.body)
  })
}
