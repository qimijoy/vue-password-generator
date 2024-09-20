// APPLICATION
import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App);

// PINIA
import { createPinia } from 'pinia';
app.use(createPinia());

// STYLES
import './assets/main.css';

app.mount('#app');
