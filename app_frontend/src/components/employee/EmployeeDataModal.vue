<script setup>
  const props = defineProps({
    employee: {
      type: Object,
      default: null,
    },
  });
</script>

<template>
  <div class="data-container">
    <div>
      <span class="bold">Nome: </span>
      <span>{{ props.employee.name }}</span>
    </div>

    <div>
      <span class="bold">E-mail: </span>
      <span>{{ props.employee.email }}</span>
    </div>

    <div>
      <span class="bold">Ocupação: </span>
      <span>{{ props.employee.occupation }}</span>
    </div>

    <div>
      <span class="bold">Salário: </span>
      <span>R${{ props.employee.salary }}</span>
    </div>

    <div>
      <span class="bold">Nome do banco: </span>
      <span>{{ props.employee.bank_account.bank_name }}</span>
    </div>

    <div>
      <span class="bold">Conta: </span>
      <span>{{ props.employee.bank_account.account }}</span>
    </div>

    <div>
      <span class="bold">Código do bnaco: </span>
      <span>{{ props.employee.bank_account.bank_code }}</span>
    </div>
  </div>
</template>

<style scoped>
  .data-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .bold { font-weight: 700; }
</style>