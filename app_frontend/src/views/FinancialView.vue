<script setup>
  import { ref, computed } from 'vue';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';

  import IconField from 'primevue/iconfield';
  import InputIcon from 'primevue/inputicon';
  import Button from 'primevue/button';
  import InputText from 'primevue/inputtext';

  import SectionHeader from '../components/SectionHeader.vue';

  const products = ref([
    { code: 'P001', work: 'Projeto A', description: 'Descrição do Projeto A', status: 'Concluído', taxes: '10%', balance: '$1000', deposit: '$500' },
    { code: 'P002', work: 'Projeto B', description: 'Descrição do Projeto B', status: 'Em andamento', taxes: '15%', balance: '$2000', deposit: '$1000' },
    { code: 'P003', work: 'Projeto C', description: 'Descrição do Projeto C', status: 'Pendente', taxes: '20%', balance: '$3000', deposit: '$1500' },
    { code: 'P004', work: 'Projeto D', description: 'Descrição do Projeto D', status: 'Concluído', taxes: '5%', balance: '$4000', deposit: '$2000' },
    { code: 'P005', work: 'Projeto E', description: 'Descrição do Projeto E', status: 'Em andamento', taxes: '12%', balance: '$5000', deposit: '$2500' }
  ]);

  const filters = ref({
    global: { value: '' }
  });

  const getRows = computed(() => products.value.length)
  const first = ref(0);
  const selectedProducts = ref([]);

  const clearFilter = () => {
    filters.value['global'].value = '';
  };
</script>

<template>
  <SectionHeader title="Financeiro">
    <template #actions>
      <Button label="Criar registro" size="small" icon="pi pi-plus"  iconPos="right" />
      <Button icon="pi pi-ellipsis-h" size="small" variant="outlined" class="borderless" />
    </template>
  </SectionHeader>

  <DataTable
    :value="products"
    :rows="getRows"
    :first="first"
    :totalRecords="products.length"
    tableStyle="min-width: 50rem"
    class="custom-table"
    :paginator="true"
    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
    :rowsPerPageOptions="[5, 10, 25]"
    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} produtos"
    @update:page="first = $event.first"
    @update:rows="rows = $event.rows"
    :selection="selectedProducts"
    @selection-change="selectedProducts = $event.value"
    dataKey="code"
  >
    <template #header>
      <div class="table-header">
        <div class="left-actions">
          <Button type="button" icon="pi pi-filter" @click="clearFilter" />
          <IconField>
              <InputIcon><i class="pi pi-search" /></InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>

        <Button type="button" icon="pi pi-plus" label="Adicionar Entrada" />
      </div>
    </template>

    <template #empty>
      <div class="empty-table">
        No customers found
      </div>
    </template>

    <Column selectionMode="multiple" headerStyle="width: 3em" />
    <Column field="code" header="#"></Column>
    <Column field="work" header="Trabalho"></Column>
    <Column field="description" header="Descrição"></Column>
    <Column field="status" header="Status"></Column>
    <Column field="taxes" header="Taxas"></Column>
    <Column field="balance" header="Balanço"></Column>
    <Column field="deposit" header="Deposito"></Column>
  </DataTable>
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
</style>