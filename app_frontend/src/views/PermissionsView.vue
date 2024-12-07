<script setup>
import { onMounted, ref, computed } from 'vue';
import Dialog from 'primevue/dialog';

  import SectionHeader from '../components/SectionHeader.vue';
  import AddUserModal from '../components/tenant_user/AddUserModal.vue';
  import AppLoading from '../components/AppLoading.vue';

  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Checkbox from 'primevue/checkbox';
  import Select from 'primevue/select';

  import { useModuleStore, useTenantStore, useTenantUserStore } from '../store';

  const MODULES_ROLES = {
    viewer: 'viewer',
    editor: 'editor',
  }

  const USER_ROLES = {
    admin: 'admin',
    viewer: 'viewer',
    operator: 'operator',
  };

  const users = ref([]);

  const tenantUserStore = useTenantUserStore();
  const tenantStore = useTenantStore();
  const moduleStore = useModuleStore();

  // Module

  const moduleTranslations = computed(() => ({
    viewer: 'Visualizador',
    editor: 'Editor',
  }));

  const moduleOptions = computed(() => Object.values(MODULES_ROLES).map(role => ({
    role: moduleTranslations.value[role],
    slug: role,
  })));

  // User

  const tenantTranslations = computed(() => ({
    viewer: 'Visualizador',
    admin: 'Administrador',
    owner: 'Dono',
    personal: 'Pessoal',
    operator: 'Operador',
  }));

  const tenantOptions = computed(() => Object.values(USER_ROLES).map(role => ({
    role: tenantTranslations.value[role],
    slug: role,
  })))

  const handleDelete = async (user) => {
    await tenantUserStore.detachUser({
      tenant_id: tenantStore.tenant.id,
      user_id: user.user_id,
    });

    users.value = users.value.filter(user_value => user_value.user_id !== user.user_id);
  };

  const update_request_pending = ref([]);
  const handleSave = async (user) => {
    update_request_pending.value.push(user.user_id);

    const actions = [];

    if (user.role) {
      actions.push(tenantUserStore.updateUserRole({
        tenant_id: tenantStore.tenant.id,
        user_id: user.user_id,
        body: { role: user.role.slug },
      }));
    }

    if (user.finantial.length) {
      const selected_module = moduleStore.modules.find(module => module.name === 'finantial');

      actions.push(moduleStore.attachUser({
        tenant_id: tenantStore.tenant.id,
        module: selected_module.id,
        body: {
          members: [{
            user_id: user.user_id,
            role: user.finantial_role.slug
          }]
        }
      }));
    }

    if (user.employee.length) {
      const selected_module = moduleStore.modules.find(module => module.name === 'employees');

      actions.push(moduleStore.attachUser({
        tenant_id: tenantStore.tenant.id,
        module: selected_module.id,
        body: {
          members: [{
            user_id: user.user_id,
            role: user.employee_role.slug
          }]
        }
      }));
    }

    await Promise.allSettled(actions);;

    update_request_pending.value = update_request_pending.value.filter(user_id => user_id !== user.user_id);
  };

  const isAssignable = (user) => ['owner', 'personal'].includes(user.role_slug);

  // Add user
  const show_add_user_modal = ref(false);
  const add_user_request_pending = ref(false);
  const handleCreateUser = async (body) => {
    add_user_request_pending.value = true;
    await tenantUserStore.attachUser({
      tenant_id: tenantStore.tenant.id,
      body,
    });

    users.value.unshift(mapUser(tenantUserStore.tenant_users[0]));
    show_add_user_modal.value = false;
    add_user_request_pending.value = false;
  }

  // Flow
  const request_pending = ref(false);
  const finantial_users = computed(() => moduleStore.modules?.find(store_module => store_module.name === 'finantial')?.users);
  const employees_users = computed(() => moduleStore.modules?.find(store_module => store_module.name === 'employees')?.users);

  const mapUser = (user) => {
    const mapped_user = {
      id: user.id,
      name: user.user.name,
      finantial: [],
      finantial_role: moduleOptions.value[0],
      employee: [],
      employee_role: moduleOptions.value[0],
      role: tenantOptions.value.find(option => option.slug === user.role),
      role_slug: user.role,
      user_id: user.user.id,
    }

    const finantial_user = finantial_users.value.find(finantial_user => finantial_user.user_id === user.user.id);

    if (finantial_users.value && finantial_user) {
      mapped_user.finantial = [true];
      mapped_user.finantial_role = moduleOptions.value.find(option => option.slug === finantial_user.role);
    }

    const employee_user = employees_users.value.find(employee_user => employee_user.user_id === user.user.id);

    if (employees_users.value && employee_user) {
      mapped_user.employee = [true];
      mapped_user.employee_role = moduleOptions.value.find(option => option.slug === employee_user.role);
    }

    return mapped_user;
  }

  const defineUsers = () => tenantUserStore.tenant_users.map(user => mapUser(user));

  onMounted(async () => {
    request_pending.value = true;
    await tenantUserStore.fetchUsers({ tenant_id: tenantStore.tenant.id });
    request_pending.value = false;
    users.value = defineUsers();
  })
</script>

<template>
  <SectionHeader title="Permissões da organização">
    <template #actions>
      <Button @click="show_add_user_modal = true" label="Adicionar usuário" size="small" icon="pi pi-plus" iconPos="right" />
    </template>
  </SectionHeader>

  <div class="section-container">
    <DataTable :value="users" tableStyle="min-width: 50rem" class="full-width">
      <Column field="name" header="Usuário"></Column>

      <Column header="Financeiro">
        <template #body="slotProps">
          <div class="input-container">
            <Checkbox v-model="slotProps.data.finantial" :value="true" />
            <Select v-model="slotProps.data.finantial_role" :disabled="! slotProps.data.finantial.length" size="small" :options="moduleOptions" optionLabel="role" placeholder="Selecione" class="table-select" />
          </div>
        </template>
      </Column>

      <Column header="Colaboradores">
        <template #body="slotProps">
          <div class="input-container">
            <Checkbox v-model="slotProps.data.employee" :value="true" />
            <Select v-model="slotProps.data.employee_role" :disabled="! slotProps.data.employee.length" size="small" :options="moduleOptions"  optionLabel="role" placeholder="Selecione" class="table-select" />
          </div>
        </template>
      </Column>

      <Column header="Permissão na organização">
        <template #body="slotProps">
          <div class="actions-container">
            <Select v-if="! isAssignable(slotProps.data)" size="small" optionLabel="role" :options="tenantOptions" v-model="slotProps.data.role" placeholder="Selecione" class="table-select" />
            <template v-else>{{ tenantTranslations[slotProps.data.role_slug] }}</template>

            <div class="gap-10">
              <Button v-if="slotProps.data.role_slug !== 'owner'" size="small" icon="pi pi-trash" class="p-button-danger" @click="handleDelete(slotProps.data)" />
              <Button :disabled="update_request_pending.includes(slotProps.data.user_id)" size="small" label="Salvar" @click="handleSave(slotProps.data)" />
            </div>
          </div>
        </template>
      </Column>

    <template #empty>
      <div class="empty-table">
        <AppLoading v-if="request_pending" />

        <template v-else>Sem usuários cadastrados na organização</template>
      </div>
    </template>
    </DataTable>
  </div>

  <Dialog v-model:visible="show_add_user_modal" modal header="Adicionar usuário" :style="{ width: '28rem' }">
    <AddUserModal
      :request_pending="add_user_request_pending"
      @close="show_add_user_modal = false"
      @create="handleCreateUser"
    />
  </Dialog>
</template>

<style scoped>
  .full-width { width: 100%; }
  .section-container {
    display: flex;
    gap: 10px;
    width: 100%;
    padding: 8px 40px;
  }

  .input-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .actions-container {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .gap-10 {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: flex-end
  }

  .empty-table  {
    width: 100%;
    display: flex;
    justify-content: center
  }

  .table-select { width: 10rem; }
</style>