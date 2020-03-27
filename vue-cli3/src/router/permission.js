import router from './index'
/* 路由发生变化修改页面title */
router.beforeEach(async (to, from, next) => {
    if (to.meta.name) { document.title = to.meta.name }
    next();
})