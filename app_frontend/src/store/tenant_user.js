import { defineStore }  from 'pinia';

import attachUser  from '../api/tenant_user/attachUser';
import fetchUsers  from '../api/tenant_user/fetchUsers';

import { handleRequest } from '../helpers/handleRequest';

export const useTenantUserStore = defineStore('tenant_user', {
  state: () => ({
    tenant_users: [],
  }),
  actions: {
    async fetchUsers({ tenant_id }) {
      await handleRequest(async () => {
        const { data } = await fetchUsers(tenant_id);

        this.tenant_users = data;
      });
    },
    async attachUser({ tenant_id, body }) {
      await handleRequest(async () => {
        const { data } = await attachUser(tenant_id, body);

        this.tenant_users.unshift(data[0]);
      });
    },
  }
});