import { defineStore }  from 'pinia';

import fetchTenant from '../api/tentant/fetchTenant';

import { handleRequest } from '../helpers/handleRequest';

export const useTenantStore = defineStore('tentant', {
  state: () => ({
    tentant: null
  }),
  actions: {
    async fetchTenant({ tenant_id }) {
      await handleRequest(async () => {
        const { data } = await fetchTenant(tenant_id);
        this.tentant = data;
      }, () => this.tentant = null);
    },
  }
});