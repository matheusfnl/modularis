<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  import TieredMenu from 'primevue/tieredmenu';
  import Dialog from 'primevue/dialog';
  import CreateTenantModal from './CreateTenantModal.vue';
  import DeleteTenantModal from './DeleteTenantModal.vue';
  import EditTenantModal from './EditTenantModal.vue';

  import MenuOption from './MenuOption.vue';
  import DashboardIcon from '../../icons/DashboardIcon.vue';
  import TeamIcon from '../../icons/TeamIcon.vue';
  import EmployeesIcon from '../../icons/EmployeesIcon.vue';
  import PigBankIcon from '../../icons/PigBankIcon.vue';
  import ChevronIcon from '../../icons/ChevronIcon.vue';

  import EmptyTenant from '../../assets/empty-tenant.png';

  import { useTenantStore, useFlowStore } from '../../store';

  const router = useRouter();
  const route = useRoute();
  const tenantStore = useTenantStore();
  const flowStore = useFlowStore();

  // Menu options

  const menu_options = ref([
    { text: 'Dashboard', slug: 'dashboard', icon: DashboardIcon },
    { text: 'Funcionários', slug: 'employees', icon: EmployeesIcon },
    { text: 'Times', slug: 'teams', icon: TeamIcon, fill: true },
    { text: 'Financeiro', slug: 'financial', icon: PigBankIcon, fill: true },
  ]);

  const organizationMenu = ref(null);
  const tenantsMenu = computed(() => {
    const tenants = tenantStore.tenants.map(tenant => ({
      label: tenant.name,
      disabled: tenant.id === tenantStore.tenant?.id,
      command: () => changeOrganization(tenant),
    }));

    if (tenants.length) {
      tenants.push({ separator: true });
    }

    return tenants;
  });

  const menuItems = computed(() => [
    ...tenantsMenu.value,
    { label: 'Nova organização', command: () => tenant_modal_visible.value = true },
    { label: 'Editar organização', command: () => tenant_edit_modal_visible.value = true },
    { label: 'Deletar organização', command: () =>  tenant_delete_visible.value = true, disabled: getIsDefaultTenant.value},
  ]);

  const openOrganizationMenu = (event) => organizationMenu.value.toggle(event);
  const selectedOption = (option) => route.path.startsWith(`/${option.slug}`);
  const setSelectedOption = (option) => router.push(`/${option.slug}`);

  // Change tenant

  const changeOrganization = async (tenant) => {
    flowStore.setAppRequestPending(true);
    closeTenantModal();
    await tenantStore.changeTenant({ tenant });
    flowStore.setAppRequestPending(false);
  };

  // Create tenant

  const tenant_create_request_pending = ref(false);
  const tenant_modal_visible = ref(false);

  const closeTenantModal = () => tenant_modal_visible.value = false;
  const createTenant = async (body) => {
    tenant_create_request_pending.value = true;
    await tenantStore.createTenant(body);
    closeTenantModal();
    tenant_create_request_pending.value = false;
  }

  // Delete tenant

  const tenant_delete_visible = ref(false);

  const getIsDefaultTenant = computed(() => {
    return tenantStore.tenant?.id === tenantStore.tenants[tenantStore.tenants.length - 1]?.id;
  });

  const closeDeleteTenantModal = () => tenant_delete_visible.value = false;
  const deleteCurrentTenant = async () => {
    flowStore.setAppRequestPending(true);
    closeDeleteTenantModal();
    const current_tenant_id = tenantStore.tenant.id;
    await tenantStore.changeTenant({ tenant: tenantStore.tenants[tenantStore.tenants.length - 1] });
    await tenantStore.deleteTenant({ tenant_id: current_tenant_id });
    flowStore.setAppRequestPending(false);
  }

  // Edit tenant

  const tenant_edit_request_pending = ref(false);
  const tenant_edit_modal_visible = ref(false);

  const closeEditTenantModal = () => tenant_edit_modal_visible.value = false;
  const editCurrentTenant = async (body) => {
    tenant_edit_request_pending.value = true;
    await tenantStore.editTenant({
      tenant_id: tenantStore.tenant.id,
      body,
    });

    tenant_edit_request_pending.value = false;
    closeEditTenantModal();
  }


  onMounted(() => {
    tenantStore.fetchTenants();
  })
</script>

<template>
  <aside class="side-menu">
    <div class="logo-container unselectable" @click="router.push('/dashboard')">
      Modularis
    </div>

    <div class="menu-options-container">
      <MenuOption
        v-for="option in menu_options"
        :key="option.slug"
        :selected="selectedOption(option)"
        :option="option"
        @click="setSelectedOption(option)"
      />
    </div>

    <div class="footer-container">
      <div class="organization-info-container">
        <img class="organization-photo" :src="EmptyTenant" alt="organization-photo" />

        <div class="organization-name-container">
          <TieredMenu :model="menuItems" ref="organizationMenu" id="overlay_tmenu" popup />

          <div class="organization-change-container" @click="openOrganizationMenu">
            <span class="organization-name-text">Organização Legal</span>
            <ChevronIcon size="10" />
          </div>

          <span class="role-text">
            Admin
          </span>
        </div>
      </div>
    </div>

    <Dialog v-model:visible="tenant_modal_visible" modal header="Criar uma organização" :style="{ width: '25rem' }">
      <CreateTenantModal
        @cancel="closeTenantModal"
        @create="createTenant"
        :request_pending="tenant_create_request_pending"
      />
    </Dialog>

    <Dialog v-model:visible="tenant_delete_visible" modal header="Deletar a organização" :style="{ width: '25rem' }">
      <DeleteTenantModal
        @cancel="closeDeleteTenantModal"
        @delete="deleteCurrentTenant"
      />
    </Dialog>

    <Dialog v-model:visible="tenant_edit_modal_visible" modal header="Editar a organização" :style="{ width: '25rem' }">
      <EditTenantModal
        v-if="tenantStore.tenant"
        @cancel="closeEditTenantModal"
        @edit="editCurrentTenant"
        :request_pending="tenant_edit_request_pending"
        :tenant="tenantStore.tenant"
      />
    </Dialog>
  </aside>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  .side-menu {
    width: 267px;
    height: 100%;
    background-color: var(--base-contrast-1);
    color: var(--text-contrast-9);

    display: flex;
    flex-direction: column;
  }

  .logo-container {
    height: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    line-height: 27px;
    font-weight: 600;
    border-bottom: 3px solid var(--text-contrast-3);
    font-family: "Poppins", system-ui, Avenir, Helvetica, Arial, sans-serif;
    cursor: pointer;
  }

  .unselectable {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .menu-options-container {
    flex: 1;
    padding: 28px 0;
    overflow-y: auto;
  }

  .footer-container {
    height: 128px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid var(--text-contrast-3);
  }

  .organization-info-container {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 228px;
    max-width: 100%;;
  }

  .organization-photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgb(236, 236, 236);
    padding: 4px;
  }

  .organization-name-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .organization-change-container {
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    width: 100%;
  }

  .organization-name-text {
    font-weight: 500;
    max-width: 100%;
    width: 146px;
    display: -webkit-box;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .role-text {
    font-size: 13px;
    font-weight: 400;
    color: var(--text-contrast-4);
  }
</style>