/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-27 19:40:49
 * @LastEditors  : Pat
 * @LastEditTime : 2020-04-26 15:16:11
 */
import Vue from 'vue'
import App from './App.vue'
import config from './init/amb'
import router from './router'

import "./router/permission"
Vue.config.productionTip = false
document.title = config.moduleName
new Vue({
	render: h => h(App),
	router,
}).$mount('#app')
