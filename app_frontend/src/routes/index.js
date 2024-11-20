import { createWebHistory, createRouter } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FinancialView from'../views/FinancialView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView, },
  { path: '/login', component: LoginView, meta: { auth: true } },
  { path: '/register', component: RegisterView, meta: { auth: true } },
  { path: '/financial', component: FinancialView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;