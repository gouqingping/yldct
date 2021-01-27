/*
 * @Autor        : Pat
 * @Description  : Main Config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-29 11:16:41
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 09:26:41
 */
import { createApp } from 'vue';
import router, { setRoute } from '/@/router';
import { setupStore } from '/@/config/store';
import App from '/@/App';
import { setupProdMockServer } from '../mock/_createProductionServer';
import '/@/assets/scss/common.scss';
import 'element-plus/lib/theme-chalk/index.css';
import sys from "./init/sys";
import amb from "/@/init/amb.js"
const app = createApp(App);
// Configure routing
setRoute(app);
// Configure vuex store
setupStore(app);
// Mount when the route is ready
router.isReady().then(() => {
    app.mount('#app', true);
});
// The development environment takes effect
if (sys.type == "enterprise") {
    app.config.performance = true;
    app.config.warnHandler = () => null;
    if (amb.mock) {
        setupProdMockServer();
    }
} else {
    app.config.performance = false;
    app.config.warnHandler = () => null;
    app.config.errorHandler = () => null;
};
