import { createRouter, createWebHistory } from 'vue-router'
import Auth_page from '@/Pages/Auth_page.vue'
import Greeting_page from '@/Pages/Greeting_page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: Auth_page,
    },
    {
      path: '/',
      name: 'greating',
      component: Greeting_page,
    },
  ],
})

export default router
