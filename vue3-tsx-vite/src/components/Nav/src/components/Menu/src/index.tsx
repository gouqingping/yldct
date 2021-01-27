/*
 * @Autor        : Pat
 * @Description  : Set Menu
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 16:00:13
 */
import { defineComponent, reactive, computed, watch } from 'vue';
import { ElMenu } from "element-plus";
import SubMenuVue from "./tsx/subMenu";
import { useStore } from "vuex";
import { RouteRecordNormalized, useRoute } from "vue-router";
import lang from "/@/config/lang";
import amb from "/@/init/amb";
import "./scss/index.scss";
let _Menu = defineComponent({
    name: 'Menu',
    props: {
        // 是否收起
        // Boolean (true or false)
        isCollapse: {
            type: Boolean
        },
        // 导航栏背景色
        // String
        backgroundColor: {
            type: String,
            default: "rgba(0,0,0,0)"
        },
        // 导航文字颜色
        // String
        textColor: {
            type: String,
            default: "white"
        },
        // 导航选中文字颜色
        // String
        activeTextColor: {
            type: String,
            default: "white"
        },
        // MIS栏类型
        // String
        // left,top
        type: {
            type: String,
            default: "left"
        }
    },
    setup(props) {
        let currentRoutes = useStore().getters.permission.routes, currentCollapse: any = props.isCollapse;
        watch([props.isCollapse], (newValue) => {
            // 函数包含更新前，更新后的值
            currentCollapse = newValue
        })
        return reactive({
            ...{
                routes: currentRoutes,
                currentCollapse
            }
        });
    }
});

_Menu.render = function render(_ctx: any, _cache: any) {
    const { currentCollapse, backgroundColor, textColor, activeTextColor, routes, type } = _ctx;
    let activeMenu = computed(() => useRoute().path);
    return (<div class="navMenu">{
        ((isCollapse, backgroundColor, textColor, activeTextColor) => {
            return (
                <ElMenu
                    uniqueOpened={true}
                    router={true}
                    collapse={isCollapse}
                    collapse-transition={true}
                    background-color={backgroundColor}
                    text-color={textColor}
                    active-text-color={activeTextColor}
                    default-active={activeMenu.value}
                    unique-opened
                >
                    {
                        ((t, r) => {
                            let menuItemArr: Array<any> = [];
                            if (t === "left") {
                                menuItemArr.push(
                                    <div class="module-title" onClick={() => { _ctx.$router.push("/home") }}>
                                        <img class="module-logo" src={amb.logo} alt={lang.moduleName} />
                                        <span class="module-name space">{lang.moduleName}</span>
                                    </div>);
                            };
                            r.map((item: RouteRecordNormalized) => {
                                const { path: parentPath } = item;
                                menuItemArr.push(<SubMenuVue {...{ menu: item, parentPath }}></SubMenuVue>)
                            });
                            return menuItemArr;
                        })(type, routes)
                    }
                </ElMenu>
            )
        })(currentCollapse, backgroundColor, textColor, activeTextColor)
    }</div>);
};

_Menu.install = (app: any) => {
    app.component(_Menu.name, _Menu);
};

export default _Menu;
