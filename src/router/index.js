import UsersView from '@/views/Users.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: UsersView
    },
   
  ]
})

export default router
