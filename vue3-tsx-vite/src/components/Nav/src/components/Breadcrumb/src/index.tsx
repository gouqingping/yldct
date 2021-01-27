/*
 * @Autor        : Pat
 * @Description  : Set Menu
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 14:05:46
 */
import { defineComponent, reactive, computed, ref } from 'vue';
import { ElBreadcrumb, ElBreadcrumbItem } from "element-plus";
import { useRoute, RouterLink } from "vue-router";
import "./scss/index.scss";
let _Breadcrumb = defineComponent({
    name: 'Header',
    setup() {

        let state: any = reactive({
            router: useRoute(),
            levelList: ref([])
        });

        state.levelList = computed(() => {
            const { matched: ROUTER_MATCHED } = state.router as any;
            let matched = ROUTER_MATCHED.filter((item: any) => item.meta.title);
            const first = matched[0];
            if (first && first.meta.title !== "首页") {
                matched = [{ path: "/home", meta: { title: "首页" } }].concat(matched);
            };
            return matched;
        });

        return () => (
            <>
                <ElBreadcrumb class="app-breadcrumb" separator="/">
                    {
                        state.levelList.map((item: any, index: number) => {
                            const showDom = ((item: any) => {
                                const { meta: { title }, path, redirect } = item;
                                if (title) {
                                    return (
                                        <ElBreadcrumbItem key={path}>
                                            {
                                                (() => {
                                                    if (redirect === 'noredirect' || index == state.levelList.length - 1) {
                                                        return (<span class="no-redirect">{title}</span>)
                                                    } else {
                                                        return (<RouterLink to={path} class="can-router">{title}</RouterLink>)
                                                    }
                                                })()
                                            }
                                        </ElBreadcrumbItem>
                                    )
                                };
                                return "";
                            })(item);
                            return showDom;
                        })
                    }
                </ElBreadcrumb>
                <div class="page-title">{state.levelList[state.levelList.length - 1].meta.title ? state.levelList[state.levelList.length - 1].meta.title : ""}</div>
            </>
        )
    }
});

_Breadcrumb.install = (app: any) => {
    app.component(_Breadcrumb.name, _Breadcrumb);
};
export default _Breadcrumb
