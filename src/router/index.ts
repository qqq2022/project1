import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'JS',
      component: HomeView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/useForm',
      name: 'useForm',
      component: () => import('../views/APITest/pages/UseForm.vue')
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('../views/APITest/pages/Grid.vue')
    },
    {
      path: '/factory',
      name: 'factory',
      component: () => import('../views/JSDemo/factory.vue')
    },
    {
      path: '/antd',
      name: 'antd',
      component: () => import('../views/APITest/pages/antd.vue')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../views/APITest/pages/card.vue')
    },
    {
      path: '/style',
      name: 'style',
      component: () => import('../views/styleDemo/styleDemo.vue')
    },
    {
      path: '/line-split',
      name: 'LineSplit',
      component: () => import('../views/styleDemo/pages/LineSplit.vue')
    },
    {
      path: '/margin-split',
      name: 'MarginSplit',
      component: () => import('../views/styleDemo/pages/MarginSplit.vue')
    },
    {
      path: '/custom-card',
      name: 'CustomCard',
      component: () => import('../views/styleDemo/pages/CustomCard.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  // 这里写你的路由守卫逻辑
  console.log(`Navigating from ${from.path} to ${to.path}`)

  // 示例：登录验证
  const isAuthenticated = localStorage.getItem('token')
  console.log('isAuthenticated', isAuthenticated)

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 重定向到登录页面
    next('/login')
  } else {
    // 继续正常导航
    next()
  }
})

export default router
