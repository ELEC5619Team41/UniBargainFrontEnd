import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import 'bootstrap/dist/css/bootstrap.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus';


const app = createApp(App);
app


app.use(ElementPlus)
app.use(router);
app.use(i18n);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js'