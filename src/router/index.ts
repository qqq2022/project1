import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/PassProps.vue'

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
      component: () => import('../views/ref&reactive.vue')
    },
    {
      path: '/useForm',
      name: 'useForm',
      component: () => import('../views/UseForm.vue')
    },
    {
      path: '/grid',
      name: 'grid',
      component: () => import('../views/Grid.vue')
    },
    {
      path: '/factory',
      name: 'factory',
      component: () => import('../views/factory.vue')
    },
    {
      path: '/antd',
      name: 'antd',
      component: () => import('../views/antd.vue')
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../views/card.vue')
    }
  ]
})

export default router
