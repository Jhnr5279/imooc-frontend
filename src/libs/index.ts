import type { App } from 'vue'
import { defineAsyncComponent } from 'vue'
export { confirm } from './m-confirm/index'
export { message } from './m-message'

// 自动注册自定义组件，但是没有类型支持
// 使用unpluging-vue-component插件进行自动注册
export default {
  install: (app: App<Element>) => {
    // 自动注册组件 组件名有 m- 前缀
    const components = import.meta.glob('./*/index.vue')
    for (const [fullPath, fn] of Object.entries(components)) {
      const componentName = `m-${fullPath.split('/')[1]}`
      app.component(
        componentName,
        defineAsyncComponent(fn as () => Promise<Component>)
      )
    }
  }
}
