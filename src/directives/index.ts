import type { App } from 'vue'
export default {
  install(app: App<Element>) {
    const directives: Record<string, { default: Object }> = import.meta.glob(
      './modules/*.ts',
      {
        eager: true
      }
    )
    for (const [key, value] of Object.entries(directives)) {
      const name = key.replace('./modules/', '').replace('.ts', '')
      app.directive(name, value.default)
    }
  }
}
