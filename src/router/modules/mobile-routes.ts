import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/pins/:id',
    component: () => import('@/views/pins/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login-register/login/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/member',
    name: 'member',
    component: () => import('@/views/member/index.vue'),
    meta: {
      user: true
    }
  },
  {
    path: '/pay/result',
    name: 'payResult',
    component: () => import('@/views/pay/index.vue')
  }
] as RouteRecordRaw[]
