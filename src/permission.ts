import { message } from './libs'
import router from './router'
import { useUserStore } from './stores'

router.beforeEach((to, from) => {
  const userStore = useUserStore()
  if (!to.meta.user) {
    return
  }
  if (userStore.token) {
    return true
  }

  message('warn', '登录失效,请重新登录')
  return '/'
})
