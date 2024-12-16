import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/three',
      name: 'three',
      component: ()=>import('@/views/three.vue')
    },
    {
      path: '/threeTransmission',
      name: 'threeTransmission',
      component: ()=>import('@/views/threeTransmission.vue')
    }
  ]
})

export default router
