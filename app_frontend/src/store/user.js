import { defineStore }  from 'pinia';

import login from '../api/auth/login';
import register from '../api/auth/register';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    login: async (state, body) => {
      const { data } = await login(body);

      state.user = data;
    },
    register: async (state, body) => {
      const { data } = await register(body);

      console.log(data);

      state.user = data;
    },
  },
});