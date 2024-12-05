import { createWebHistory, createRouter } from 'vue-router'
import { jwtDecode } from "jwt-decode";

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import FinancialView from'../views/FinancialView.vue'

import {
  useUserStore,
  useTenantStore,
} from '../store';

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
  const tenantStore = useTenantStore();
  const token = localStorage.getItem('@auth');

  if (token) {
    const actions = [];

    if (! userStore.user) {
      actions.push(userStore.fetchUser());
    }

    if (! tenantStore.tenant) {
      const { tenant_id } = jwtDecode(token);
      actions.push(tenantStore.fetchTenant({ tenant_id }));
    }

    await Promise.all(actions);
  }

  if (token && ! userStore.user) {
    localStorage.removeItem('@auth');
  }

  if (! userStore.user && !to.meta.auth) {
    return next('/login');
  }

  if (userStore.user && to.meta.auth) {
    return next('/dashboard');
  }

  next();
});

export default router;