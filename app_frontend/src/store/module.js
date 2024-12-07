import { defineStore }  from 'pinia';

import fetchModules  from '../api/module/fetchModules';
import contractModule  from '../api/module/contractModule';
import executeModule from '../api/module/executeModule';

import { handleRequest } from '../helpers/handleRequest';

export const useModuleStore = defineStore('module', {
  state: () => ({
    modules: [],
    module: {},
  }),
  actions: {
    async fetchModules({ tenant_id }) {
      await handleRequest(async () => {
        const { data } = await fetchModules(tenant_id);

        this.modules = data;
      });
    },
    async contractModule({ tenant_id, module }) {
      await handleRequest(async () => {
        await contractModule(tenant_id, module);
        await this.fetchModules({ tenant_id });
      });
    },
    async executeModule({ tenant_id, module, body }) {
      await handleRequest(async () => {
        const response = await executeModule(tenant_id, module, body);

        if (body.action === 'index') {
          this.module = response;
        }

        if (body.action === 'create') {
          this.module.result.push(response.result);
        }

        if (body.action === 'edit') {
          this.module.result = this.module.result.map((item) => {
            if (item.id === response.result.id) {
              return response.result;
            }

            return item;
          });
        }

        if (body.action === 'delete') {
          this.module.result = this.module.result.filter((item) => item.id !== body.instructions.item_id);
        }
      });
    }
  }
});