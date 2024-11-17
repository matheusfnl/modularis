<script setup>
  import { ref } from 'vue';

  import MenuOption from './MenuOption.vue';
  import DashboardIcon from '../../icons/DashboardIcon.vue';
  import ToDoIcon from '../../icons/ToDoIcon.vue';
  import EmployeesIcon from '../../icons/EmployeesIcon.vue';
  import PigBankIcon from '../../icons/PigBankIcon.vue';
  import ChevronIcon from '../../icons/ChevronIcon.vue';

  import EmptyPhoto from '../../assets/empty-photo.png';

  const selected_option = ref('dashboard');
  const menu_options = ref([
    { text: 'Dashboard', slug: 'dashboard', icon: DashboardIcon },
    { text: 'Trabalhos', slug: 'to-do', icon: ToDoIcon },
    { text: 'Funcionários', slug: 'employees', icon: EmployeesIcon },
    { text: 'Financeiro', slug: 'financial', icon: PigBankIcon, fill: true },
  ]);
</script>

<template>
  <aside class="lateral-menu">
    <div class="logo-container unselectable">
      Modularis
    </div>

    <div class="menu-options-container">
      <MenuOption
        v-for="option in menu_options"
        :key="option.slug"
        :selected="option.slug === selected_option"
        :option="option"
        @click="selected_option = option.slug"
      />
    </div>

    <div class="footer-container">
      <div class="organization-info-container">
        <img class="organization-photo" :src="EmptyPhoto" alt="organization-photo" />

        <div class="organization-name-container">
          <div class="organization-change-container">
            <span class="organization-name-text">Organização Legal</span>
            <ChevronIcon size="10" />
          </div>

          <span class="role-text">
            Admin
          </span>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

  .lateral-menu {
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
    padding: 0px 24px;
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
    gap: 12px;
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