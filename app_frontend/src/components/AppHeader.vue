<script setup>
  import { ref } from 'vue';

  import InputText from 'primevue/inputtext';
  import IconField from 'primevue/iconfield';
  import InputIcon from 'primevue/inputicon';
  import TieredMenu from 'primevue/tieredmenu';

  import ChevronIcon from '../icons/ChevronIcon.vue';

  import EmptyPhoto from '../assets/empty-photo.png';

  const profileMenu = ref(null);
  const notificationMenu = ref(null);
  const menuItems = ref([
    { label: 'Opção 1', command: () => alert('Clicou na opção 1!') },
    { label: 'Opção 2', command: () => alert('Clicou na opção 2!') },
  ]);

  const openProfileMenu = (event) => profileMenu.value.toggle(event);
  const openNotificationMenu = (event) => notificationMenu.value.toggle(event);
</script>

<template>
  <header class="header-container">
    <div class="header-content">
      <IconField>
        <InputIcon class="pi pi-search" />
        <InputText placeholder="Search..." class="without-box-shadow" />
      </IconField>

      <div class="lateral-content">
        <div class="notification-container" @click="openNotificationMenu">
          <i class="pi pi-bell" />
          <div class="notification-popup" />
        </div>

        <TieredMenu :model="menuItems" ref="notificationMenu" popup />

        <div class="profile-container" @click="openProfileMenu">
          <img class="profile-photo" :src="EmptyPhoto" alt="profile-photo" />
          <ChevronIcon size="12" />
        </div>

        <TieredMenu :model="menuItems" ref="profileMenu" popup />
      </div>
    </div>
  </header>
</template>

<style scoped>
  .header-container {
    height: 68px;
    border-bottom: 1px solid var(--text-2);
    display: flex;
    align-items: center;
  }

  .header-content {
    padding: 0 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .without-box-shadow { box-shadow: none; }
  .lateral-content {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .notification-container {
    width: 40px;
    height: 40px;
    border: 1px solid var(--base-4);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-4);
    position: relative;
    cursor: pointer;
  }

  .notification-popup {
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 10px;
    background-color: var(--info-color-4);
    border-radius: 50%;
  }

  .profile-container {
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  .profile-photo {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
</style>