import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import  'bootstrap'
import  'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
