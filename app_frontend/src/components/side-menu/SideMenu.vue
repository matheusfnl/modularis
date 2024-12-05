<script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';

  import TieredMenu from 'primevue/tieredmenu';
  import Dialog from 'primevue/dialog';
  import CreateTenantModal from './CreateTenantModal.vue';

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

  const menu_options = ref([
    { text: 'Dashboard', slug: 'dashboard', icon: DashboardIcon },
    { text: 'Funcionários', slug: 'employees', icon: EmployeesIcon },
    { text: 'Times', slug: 'teams', icon: TeamIcon, fill: true },
    { text: 'Financeiro', slug: 'financial', icon: PigBankIcon, fill: true },
  ]);

  const tenant_modal_visible = ref(false);
  const organizationMenu = ref(null);
  const tenantsMenu = computed(() => {
    const tenants = tenantStore.tenants.map(tenant => ({
      label: tenant.name,
      disabled: tenant.id === tenantStore.tenant.id,
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
    { label: 'Editar organização', command: () => alert('Editar organização') },
    { label: 'Deletar organização', command: () => alert('Deletar organização') },
  ]);

  const openOrganizationMenu = (event) => organizationMenu.value.toggle(event);
  const selectedOption = (option) => route.path.startsWith(`/${option.slug}`);
  const setSelectedOption = (option) => router.push(`/${option.slug}`);

  const changeOrganization = async (tenant) => {
    flowStore.setAppRequestPending(true);
    await tenantStore.changeTenant({ tenant });
    flowStore.setAppRequestPending(false);
  };

  const closeTenantModal = () => tenant_modal_visible.value = false;
  const createTenant = (body) => {
    console.log(body)
    // CRIA A ORG AQUI

    closeTenantModal();
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