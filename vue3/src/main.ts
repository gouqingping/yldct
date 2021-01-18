/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-29 11:16:41
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-15 16:13:08
 */
import { createApp } from 'vue';
import router from './router/index';
import store from './config/store';
import App from './App';
import "./router/permission";
import './assets/scss/common.scss';
import 'element-plus/lib/theme-chalk/index.css';
const app = createApp(App);
app.use(router).use(store).mount('#app')
