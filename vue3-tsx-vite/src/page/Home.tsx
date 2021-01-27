/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-14 16:36:31
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-26 14:30:29
 */
import { App, defineComponent } from 'vue';
let script = defineComponent({
    name: "Home",
    setup() {
        return
    }
})
script.render = function (root: any, _ctx: any) {
    const { } = root;
    return (
        <>
            <div>1111</div>
        </>
    )
};

script.install = (app: App) => {
    app.component(script.name, script);
};
const Home = script;
export default Home;