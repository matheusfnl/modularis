import {
  useUserStore,
  useTenantStore,
  useFlowStore,
  useModuleStore,
  useTenantUserStore,
} from '../store';

export const clearStores = async () => {
  const stores = [
    useUserStore(),
    useTenantStore(),
    useFlowStore(),
    useModuleStore(),
    useTenantUserStore(),
  ];

  stores.forEach(store => store.$reset());
}