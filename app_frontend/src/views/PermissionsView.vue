<script setup>
import { onMounted, ref } from 'vue';
import Dialog from 'primevue/dialog';

  import SectionHeader from '../components/SectionHeader.vue';
  import AddUserModal from '../components/tenant_user/AddUserModal.vue';
  import AppLoading from '../components/AppLoading.vue';

  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Checkbox from 'primevue/checkbox';
  import Select from 'primevue/select';

  import { useTenantStore, useTenantUserStore } from '../store';

  const MODULES_ROLES = {
    viewer: 'viewer',
    editor: 'editor',
  }

  const users = ref([
    { id: 1, name: 'Usuário 1', financeiro: [], colaboradores: [], acao: '' },
    { id: 2, name: 'Usuário 2', financeiro: [], colaboradores: [], acao: '' },
  ]);

  const tenantUserStore = useTenantUserStore();
  const tenantStore = useTenantStore();

  const options = ref([]);
  const handleDelete = (user) => {
    users.value = users.value.filter(u => u.id !== user.id);
  };

  // Add user
  const show_add_user_modal = ref(false);
  const add_user_request_pending = ref(false);
  const handleCreateUser = (body) => {
    add_user_request_pending.value = true;
    tenantUserStore.attachUser({
      tenant_id: tenantStore.tenant.id,
      body,
    });

    add_user_request_pending.value = false;
  }

  // Flow
  const request_pending = ref(false);

  onMounted(async () => {
    request_pending.value = true;
    await tenantUserStore.fetchUsers({ tenant_id: tenantStore.tenant.id });
    request_pending.value = false;
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
          <div class="actions-container">
            <Checkbox v-model="slotProps.data.financeiro" :value="true" />
            <Select :disabled="! slotProps.data.financeiro.length" size="small" :options="options" placeholder="Selecione" />
          </div>
        </template>
      </Column>

      <Column header="Colaboradores">
        <template #body="slotProps">
          <div class="actions-container">
            <Checkbox v-model="slotProps.data.colaboradores" :value="true" />
            <Select :disabled="! slotProps.data.colaboradores.length" size="small" :options="options" placeholder="Selecione" />
          </div>
        </template>
      </Column>

      <Column header="Ações">
        <template #body="slotProps">
          <div class="actions-container">
            <Select size="small" :options="options" v-model="slotProps.data.acao" placeholder="Selecione" />
            <Button size="small" icon="pi pi-trash" class="p-button-danger" @click="handleDelete(slotProps.data)" />
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

  .actions-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .empty-table  {
    width: 100%;
    display: flex;
    justify-content: center
  }
</style>