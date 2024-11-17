import { createApp } from 'vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

import './style.css'

import App from './App.vue'
import router from './routes'

createApp(App)
  .use(router)
  .use(PrimeVue, { theme: {
    preset: Aura,
    options: { darkModeSelector: false }
  } })
  .mount('#app')
