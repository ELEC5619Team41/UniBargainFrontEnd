import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus';

import * as ElIconList from '@element-plus/icons-vue'



const app = createApp(App);

for (const name in ElIconList) {
    app.component(name, ElIconList[name])
  }

app.use(store);
app.use(ElementPlus);
app.use(router);
app.use(i18n);
app.use(store);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js'