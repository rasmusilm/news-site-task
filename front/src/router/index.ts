import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import ProfileView from "@/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login,
      meta: {
        permitAll: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        permitAll: true
      }
    },
    {
      path: '/feed',
      name: 'Feed',
      component: MainView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileView
    },
  ]
})

export default router
