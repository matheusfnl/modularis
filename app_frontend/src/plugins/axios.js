import axios from "axios";
import { useRouter } from 'vue-router';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.timeout = 3000;
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('@auth');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    const router = useRouter();

    if (error.response && error.response.status === 403) {
      router.push('/unauthorized');
    }

    return Promise.reject(error);
  }
);