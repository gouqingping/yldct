/*
 * @Autor        : Pat
 * @Description  : Main Config
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-29 11:16:41
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-28 15:31:20
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
// Create system app
const app = createApp(App);
// Configure routing
setRoute(app);
// Configure vuex store
setupStore(app);
// Mount when the route is ready
router.isReady().then(() => {
    app.mount('#app', true);
});
// Turn off vue related warning messages
app.config.warnHandler = () => null;
// Open system performance
app.config.performance = true;
// The development environment takes effect
if (sys.type === "enterprise") {
    // Whether to enable Mockjs
    // If the Amb mock parameter is enabled
    // then mock data simulation is enabled
    if (amb.mock) {
        setupProdMockServer();
    }
} else {
    // Close page error prompt
    app.config.errorHandler = () => null;
};
