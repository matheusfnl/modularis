import { defineStore }  from 'pinia';

import fetchTenant from '../api/tenant/fetchTenant';
import fetchTenants from '../api/tenant/fetchTenants';
import changeTenant from '../api/tenant/changeTenant';

import { handleRequest } from '../helpers/handleRequest';

export const useTenantStore = defineStore('tenant', {
  state: () => ({
    tenant: null,
    tenants: [],
  }),
  actions: {
    async fetchTenant({ tenant_id }) {
      await handleRequest(async () => {
        const { data } = await fetchTenant(tenant_id);
        this.tenant = data;
      });
    },
    async fetchTenants() {
      await handleRequest(async () => {
        const { data } = await fetchTenants();

        this.tenants = data;
      });
    },
    async changeTenant({ tenant }) {
      await handleRequest(async () => {
        const { data } = await changeTenant(tenant.id);

        localStorage.setItem('@auth', data.token);
        this.tenant = tenant;
      });
    },
    // async createTenant() {
    //   await handleRequest(async () => {
    //     const { data } = await changeTenant(tenant.id);

    //     localStorage.setItem('@auth', data.token);
    //     this.tenant = tenant;
    //   });
    // },
  }
});