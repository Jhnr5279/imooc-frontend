import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import useTheme from './utils/theme'
import { useRem } from './utils/flexibel'
import 'virtual:svg-icons-register'
import pinia from './stores'
import directives from './directives'
import './styles/style.scss'
import './permission'

const app = createApp(App)

useRem()

app.use(pinia)
app.use(router)
app.use(directives)

useTheme()
app.mount('#app')
