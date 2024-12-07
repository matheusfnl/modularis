<script setup>
  import { ref, computed, onMounted } from 'vue';

  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import IconField from 'primevue/iconfield';
  import InputIcon from 'primevue/inputicon';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';
  import Dialog from 'primevue/dialog';

  import { useModuleLoader } from '../composables/useModuleLoader';

  import FinantialModal from '../components/finantial/FinantialModal.vue';

  import SectionHeader from '../components/SectionHeader.vue';
  import { useTenantStore, useTenantUserStore, useModuleStore } from '../store';

  const tenantUserStore = useTenantUserStore();
  const tenantStore = useTenantStore();
  const moduleStore = useModuleStore();

  // Create
  const create_modal_visible = ref(false);
  const handleCreate = (body) => {
    createModuleItem(body);
    create_modal_visible.value = false;
  }

  const {
    fetch_request_pending,
    create_request_pending,
    edit_request_pending,
    delete_request_pending,
    createModuleItem,
    editModuleItem,
    deleteModuleItem,
  } = useModuleLoader();

  const products = ref([]);
  const filters = ref({ global: { value: '' } });
  const tenant_user_request_pending = ref(false);

  const getRows = computed(() => products.value.length)

  const hasUser = (finance) => !! finance.user;
  const getUser = (finance) => {
    console.log(finance)

    if (hasUser(finance)) {
      return finance.user.name;
    }

    return 'Sem usuário';
  }

  onMounted(async () => {
    tenant_user_request_pending.value = true;
    await tenantUserStore.fetchUsers({ tenant_id: tenantStore.tenant.id });
    tenant_user_request_pending.value = false;

    products.value = moduleStore.module.result.map((product, index) => ({
      index: index + 1,
      id: product.id,
      amount: product.amount,
      description: product.description,
      type: product.type,
      user: tenantUserStore.tenant_users.find(tenant_user => tenant_user.user.id === product.user_id)?.user || null,
    }))
  });
</script>

<template>
  <SectionHeader title="Financeiro">
    <template #actions>
      <Button label="Criar registro" size="small" icon="pi pi-plus"  iconPos="right" @click="create_modal_visible = true" />
    </template>
  </SectionHeader>

  <DataTable
    :value="products"
    :rows="getRows"
    :totalRecords="products.length"
    tableStyle="min-width: 50rem"
    class="custom-table"
    dataKey="code"
  >
    <template #header>
      <div class="table-header">
        <div class="left-actions">
          <IconField>
              <InputIcon><i class="pi pi-search" /></InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </div>
    </template>

    <template #empty>
      <div class="empty-table">
        Nenhum registro encontrado.
      </div>
    </template>

    <Column field="index" header="#" />
    <Column field="description" header="Descrição" />
    <Column header="Valor">
      <template #body="slotProps">
        ${{ slotProps.data.amount }}
      </template>
    </Column>

    <Column field="status" header="Status" />
    <Column field="type" header="Tipo" />
    <Column header="Usuário">
      <template #body="slotProps">
        <span :class="{ 'userless' : ! hasUser(slotProps.data) }">
          {{ getUser(slotProps.data) }}
        </span>
      </template>
    </Column>

    <Column>
      <template #body="slotProps">
        <div class="actions-container">
          <Button size="small" icon="pi pi-pencil" />
          <Button size="small" icon="pi pi-trash" class="p-button-danger" />
        </div>
      </template>
    </Column>
  </DataTable>

  <Dialog v-model:visible="create_modal_visible" modal header="Criar registro" :style="{ width: '28rem' }">
    <FinantialModal
      :request_pending="create_request_pending"
      @cancel="create_modal_visible = false"
      @create="handleCreate"
    />
  </Dialog>
</template>

<style scoped>
  .custom-table {
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #dde4ee;
  }

  .empty-table  {
    width: 100%;
    display: flex;
    justify-content: center
  }

  ::v-deep tr > th,
  ::v-deep .p-datatable-header,
  ::v-deep .p-paginator {
    background-color: #F4F7FC;
  }

  ::v-deep tr:nth-child(odd) > td {
    background-color: #FFF;
  }

  ::v-deep tr:nth-child(even) > td {
    background-color: #F9FAFC;
  }

  ::v-deep .p-datatable-paginator-bottom {
    border-bottom: none;
  }

  .table-header {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }

  .left-actions {
    display: flex;
    gap: 10px;
  }

  .actions-container {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
  }

  .userless { color: var(--text-4) }
</style>