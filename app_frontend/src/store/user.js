import { defineStore }  from 'pinia';

import login from '../api/auth/login';
import register from '../api/auth/register';
import logout from '../api/auth/logout';
import fetchUser from '../api/auth/fetchUser';
import { handleRequest } from '../helpers/handleRequest';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(body) {
      await handleRequest(async () => {
        const { data } = await login(body);
        this.user = data;
        localStorage.setItem('@auth', data.token);
      });
    },
    async register(body) {
      await handleRequest(async () => {
        const { data } = await register(body);
        this.user = data;
        localStorage.setItem('@auth', data.token);
      });
    },
    async logout(body) {
      await handleRequest(async () => {
        await logout(body);
        this.user = null;
        localStorage.removeItem('@auth');
      });
    },
    async fetchUser() {
      await handleRequest(async () => {
        const { data } = await fetchUser();
        this.user = data;
      }, () => this.user = null);
    },
  },
});