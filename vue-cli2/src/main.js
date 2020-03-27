/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-22 17:05:07
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import 'babel-polyfill'


import './permission'
import '@/assets/scss/common.scss'

// 全局设置页面配置文件，便于一键化管理整体架构
import * as app from './config/app'
Vue.prototype.$app = app

import * as Storage from './assets/js/Storage'
Vue.prototype.$Storage = Storage.default

// // 全局设置api接口调用
// // 调用方式 this.$api
// import api from './api/index'
// // R:Login get
// // this.$api.login({id:1})
// Vue.prototype.$api = api

// 添加 Vuex
import store from './config/store/index'
Vue.prototype.$store = store

/* 路由发生变化修改页面title */
router.beforeEach((to, from, next) => {
  //console.log(to,from,next,router)
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next();
})
router.onError((to, meta, next) => {
  next()
})

document.title = app.name;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
