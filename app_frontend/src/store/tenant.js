import { defineStore }  from 'pinia';

import fetchTenant from '../api/tenant/fetchTenant';

import { handleRequest } from '../helpers/handleRequest';

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    tenant: null
  }),
  actions: {
    async fetchTenant({ tenant_id }) {
      await handleRequest(async () => {
        const { data } = await fetchTenant(tenant_id);
        this.tenant = data;
      }, () => this.tenant = null);
    },
  }
});