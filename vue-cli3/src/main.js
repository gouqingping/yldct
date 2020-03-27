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
