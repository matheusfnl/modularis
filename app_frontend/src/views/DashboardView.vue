<script setup>
  import { computed, onMounted, ref } from 'vue';

  import Button from 'primevue/button';

  import SectionHeader from '../components/SectionHeader.vue';
  import AppCard from '../components/AppCard.vue'
  import AppLoading from '../components/AppLoading.vue';
  import DashboardEmployeeItem from '../components/employee/DashboardEmployeeItem.vue';
  import DashboardTeamItem from '../components/teams/DashboardTeamItem.vue';
  import DashboardFinancialItem from '../components/finantial/DashboardFinancialItem.vue';

  import {
    useUserStore,
    useModuleStore,
    useTenantStore,
  } from '../store';

  // User

  const userStore = useUserStore();
  const tenantStore = useTenantStore();

  const getIntroduction = computed(() => `Olá, ${userStore.user?.name}!`);

  // Modules

  const moduleStore = useModuleStore();
  const request_pending = ref(true);

  const getEmployeesModule = computed(() => moduleStore.modules.find(module => module.name === 'employees') || []);
  const getFinantialModule = computed(() => moduleStore.modules.find(module => module.name === 'finantial') || []);

  const getEmployees = computed(() => moduleStore.employees.slice(0, 4));
  const getTeams = computed(() => moduleStore.teams.slice(0, 4));
  const getFinancials = computed(() => moduleStore.financial.slice(0, 4));

  const hasEmployeeModule = computed(() => !! getEmployeesModule.value);
  const hasTeamModule = computed(() => !! moduleStore.modules.find(module => module.name === 'team'));

  onMounted(async () => {
    request_pending.value = true;

    console.log('chegou aqui??')

    await Promise.allSettled([
      moduleStore.fetchEmployees({
        tenant_id: tenantStore.tenant.id,
        module: getEmployeesModule.value.id,
      }),
      moduleStore.fetchTeams({
        tenant_id: tenantStore.tenant.id,
        module: getEmployeesModule.value.id,
      }),
      moduleStore.fetchFinancial({
        tenant_id: tenantStore.tenant.id,
        module: getFinantialModule.value.id,
      }),
    ]);

    request_pending.value = false;
  });
</script>

<template>
  <SectionHeader :title="getIntroduction" description="Aqui está um resumo da sua conta" />

  <div class="dashboard-container">
    <AppCard class="custom-card">
      <div class="card-header-container">
        <span class="card-header">Funcionários</span>
        <span class="card-description">Veja um resumo dos funcionários</span>
      </div>

      <div class="module-container">
        <div v-if="request_pending" class="loading-container">
          <AppLoading />
        </div>

        <template v-else-if="getEmployees.length">
          <DashboardEmployeeItem v-for="employee in getEmployees" :key="employee.id" :employee="employee" />
        </template>

        <div class="empty-container" v-else>
          Sua organização não possui funcionários

          <Button v-if="hasEmployeeModule" size="small">Ver</Button>
          <Button v-else size="small">Contratar</Button>
        </div>
      </div>

      <div class="see-all-content">
        <Button>Ver todos</Button>
      </div>
    </AppCard>

    <AppCard class="custom-card">
      <div class="card-header-container">
        <span class="card-header">Times</span>
        <span class="card-description">Veja um resumo dos times</span>
      </div>

      <div class="module-container">
        <div v-if="request_pending" class="loading-container">
          <AppLoading />
        </div>

        <template v-else-if="getTeams.length">
          <DashboardTeamItem v-for="team in getTeams" :key="team.id" :team="team" />
        </template>

        <div class="empty-container" v-else>
          Sua organização não possui times

          <Button v-if="hasEmployeeModule" size="small">Ver</Button>
          <Button v-else size="small">Contratar</Button>
        </div>
      </div>

      <div class="see-all-content">
        <Button>Ver todos</Button>
      </div>
    </AppCard>

    <AppCard class="custom-card">
      <div class="card-header-container">
        <span class="card-header">Financeiro</span>
        <span class="card-description">Veja um resumo do financeiro</span>
      </div>

      <div class="module-container">
        <div v-if="request_pending" class="loading-container">
          <AppLoading />
        </div>

        <template v-else-if="getFinancials.length">
          <DashboardFinancialItem v-for="financial in getFinancials" :key="financial.id" :financial="financial" />
        </template>

        <div class="empty-container" v-else>
          Sua organização não possui registros

          <Button v-if="hasTeamModule" size="small">Ver</Button>
          <Button v-else size="small">Contratar</Button>
        </div>
      </div>

      <div class="see-all-content">
        <Button>Ver todos</Button>
      </div>
    </AppCard>
  </div>
</template>

<style scoped>
  .borderless,
  .borderless:hover,
  .borderless:focus { border: none !important }

  .dashboard-container {
    padding: 8px 40px;
    width: 100%;
    gap: 10px;
    display: flex;
  }

  .custom-card {
    height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
  }

  .card-header-container {
    display: flex;
    flex-direction: column;
  }

  .card-header {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .card-description { color: var(--text-5) }
  .module-container {
    display: flex;
    gap: 10px;
    margin-top: 10px;
    flex: 1;
    flex-direction: column;
    overflow-y: auto;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .empty-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    color: var(--text-4);
    align-items: center;
  }

  .see-all-content {
    align-items: flex-end;
    display: flex;
    padding: 20px 0 0;
  }
</style>