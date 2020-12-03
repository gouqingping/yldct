/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-27 19:40:49
 * @LastEditors  : Pat
 * @LastEditTime : 2020-11-06 10:44:47
 */
const { moduleName } = require('./init/amb')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./config/store"
import "./router/permission"
Vue.config.productionTip = false
document.title = moduleName;
new Vue({
	render: h => h(App),
	router,
	store
}).$mount('#app')
