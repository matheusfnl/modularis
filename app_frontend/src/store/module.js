import { defineStore }  from 'pinia';

import fetchModules  from '../api/module/fetchModules';

import { handleRequest } from '../helpers/handleRequest';

export const useModuleStore = defineStore('module', {
  state: () => ({
    modules: []
  }),
  actions: {
    async fetchModules({ tenant_id }) {
      await handleRequest(async () => {
        const { data } = await fetchModules(tenant_id);

        this.modules = data;
      });
    }
  }
});