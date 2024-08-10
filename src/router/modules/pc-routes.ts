import type { RouteRecordRaw } from 'vue-router'

export default [
  {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    children: [
      { path: '', component: () => import('@/views/main/index.vue') },
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
    ]
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
    path: '/register',
    component: () => import('@/views/login-register/register/index.vue')
  }
] as RouteRecordRaw[]
