import { createWebHistory, createRouter } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FinancialView from'../views/FinancialView.vue'

import { useUserStore } from '../store';

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

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = localStorage.getItem('@auth');

  if (token && !userStore.user) {
    await userStore.fetchUser();
  }

  if (!userStore.user && !to.meta.auth) {
    return next('/login');
  }

  if (userStore.user && to.meta.auth) {
    return next('/dashboard');
  }

  next();
});

export default router;