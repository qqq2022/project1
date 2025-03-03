import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'JS',
      component: HomeView
    },
    {
      path: '/about',
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
    }
  ]
})

export default router
