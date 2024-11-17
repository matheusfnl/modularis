import { createWebHistory, createRouter } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView, },
  { path: '/login', component: LoginView, meta: { auth: true } },
  { path: '/register', component: RegisterView, meta: { auth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;