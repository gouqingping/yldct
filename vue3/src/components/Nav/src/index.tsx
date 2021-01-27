/*
 * @Autor        : Pat
 * @Description  : Set Mis Nav
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 15:14:06
 */
import { defineComponent, computed, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import Header from "./components/Header";
import Menu from "./components/Menu";
import Breadcrumb from "./components/Breadcrumb";
import "./scss/index.scss";
let Nav = defineComponent({
    name: 'Nav',
    props: {
        // 是否收起
        // Boolean (true or false)
        isCollapse: {
            type: Boolean,
            default: true
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
            default: "#aaa"
        },
        // 导航选中文字颜色
        // String
        activeTextColor: {
            type: String,
            default: "white"
        },
        // 导航文字大小
        // String
        fontSize: {
            type: String,
            default: ""
        },
        // 横标题
        // Array
        subTitle: {
            default: () => [
                {
                    iconClass: "el-icon-setting",
                    name: "设置",
                    event: (e: MouseEvent, _ctx: WindowProxy) => {
                        console.log(e, _ctx)
                    }
                }
            ],
            type: Array
        },
        // MIS栏类型
        // String
        // left,top
        type: {
            type: String,
            default: "left"
        }
    },
    // Setup render
    setup(props, { slots }) {
        // 分解props传参
        const { isCollapse, backgroundColor, textColor, activeTextColor, subTitle, fontSize, type } = props;
        // 动态计算获取当前路由地址
        let usePath = computed(() => useRoute().path),
            // 初始化收起状态
            currentCollapse: any = ref(isCollapse);
        // 设置收起状态
        // 通过Header emit进行数据传输
        function setCollapse(collapse: boolean) {
            currentCollapse.value = collapse;
        }
        // 设置header头部栏
        function setHeader() {
            return (
                <div class="header">
                    <Header {...{ onSetCollapse: setCollapse, subTitle, fontSize, isCollapse: currentCollapse, type }} />
                </div>
            )
        }
        // vue render dom
        return () => (
            <div class={`sys-contail ${type}`} style={`--siderBarWidth:${!currentCollapse.value ? 'var(--siderWidth)' : 'var(--subSiderWidth)'}`}>
                {
                    ((header, type) => {
                        if (type === "top") {
                            return header;
                        };
                        return "";
                    })(setHeader(), type)
                }
                <div class="container">
                    <div class="nav-sider-bar">
                        <Menu {...{ isCollapse: currentCollapse, backgroundColor, textColor, activeTextColor, type }} />
                    </div>
                    <div class="content">
                        {
                            ((path, header, type) => {
                                let dom = [];
                                if (type === "left") {
                                    dom.push(header);
                                };
                                if (path != "/home") {
                                    dom.push(<Breadcrumb />)
                                }
                                return dom;
                            })(usePath.value, setHeader(), type)
                        }
                        <div class="app-main" style={type === "left" && usePath.value === "/home" ? "height:calc(100% - (var(--headerHeight)))" : ""}>
                            <div class="content">
                                <RouterView>
                                    {/* <Transition name="slide-fade">
                                        <KeepAlive>
                                            <component is={useRoute()} ></component>
                                        </KeepAlive>
                                    </Transition> */}
                                </RouterView>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
});

/**
 * @description: 初始化Nav
 * @param {any} app 
 * @Date: 2021-01-26 10:00:26
 * @author: Pat
 */
Nav.install = (app: any) => {
    app.component(Nav.name, Nav);
};

export default Nav;
