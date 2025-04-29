// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Admin from '@/views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    const isAdmin = true // ← replace with real logic or store later
  
    if (to.name === 'Admin' && !isAdmin) {
      next({ name: 'Home' }) // redirect to home
    } else {
      next() // allow navigation
    }
  })
  

export default router
