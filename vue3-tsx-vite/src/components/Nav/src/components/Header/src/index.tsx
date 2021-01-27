/*
 * @Autor        : Pat
 * @Description  : Set Menu
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 13:42:16
 */
import { defineComponent, ref, reactive } from 'vue';
import lang, { moduleName } from "/@/config/lang";
import { useStore } from "vuex";
import "./scss/index.scss";
let _Header = defineComponent({
    name: 'Header',
    props: {
        fontSize: {
            default: "",
            type: String
        },
        subTitle: {
            default: () => [
                // {
                //     icon: String,
                //     iconClass: String,
                //     name: String,
                //     event:Function
                // }
            ],
            type: Array
        },
        isCollapse: {
            type: Boolean,
            default: true
        },
        // left,top
        type: {
            type: String,
            default: "left"
        }
    },
    setup(props, { emit }) {
        const use = useStore().getters.user;
        return reactive({
            logo: ref(null),
            title: moduleName,
            userName: ref(use && use.realname ? use.realname : ""),
            fontSize: "",
            emit
        });
    }
});

function render(_ctx: any, _cache: any) {
    let state = reactive({ siderBarFlag: _ctx.isCollapse });
    const { logo, title, userName, fontSize, subTitle, emit, type } = _ctx,
        showLogo = ((logo, title) => {
            if (logo) {
                return <img src={logo} alt={title} />
            };
            return;
        })(logo, title),
        showUseName = ((useName) => {
            return (
                <div class="item">
                    <span>{lang.hallo}，</span>
                    <span class="useName">{useName}</span>
                </div>
            )
        })(userName);

    //展开和收缩左侧栏
    function controlSiderBar() {
        state.siderBarFlag = !state.siderBarFlag;
        emit("SetCollapse", state.siderBarFlag);
    };

    //登出
    function loginOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        _ctx.$router.push("/login");
    }

    function bindEvent(index: number, e: MouseEvent) {
        if (_ctx.subTitle && _ctx.subTitle[index] && _ctx.subTitle[index].event) {
            _ctx.subTitle[index].event(e, _ctx)
        }
    }

    return (
        <div class="nav-header">
            <div class="nav-header-logo" style={fontSize ? `font-size:${fontSize}` : ''}>
                <span {...{ onClick: controlSiderBar }} class="fold"><i class={state.siderBarFlag ? "el-icon-s-unfold" : "el-icon-s-fold"}></i></span>
                <span onClick={() => { _ctx.$router.push("/home") }}>
                    {
                        ((type: string) => {
                            if (type == "left") {
                                return "";
                            }
                            return [showLogo, title]
                        })(type)
                    }
                </span>
            </div>
            <div class="nav-center">
                {[showUseName, subTitle.map((item: any, index: any) => {
                    return (
                        <div key={index} class={item.class ? `${item.class} item` : "item"}
                            {...{ onclick: bindEvent.bind(_ctx, index) }}
                        >
                            {
                                ((icon) => {
                                    if (icon) {
                                        return (<img src={item.icon} class={item.class ? item.class : ""} alt={item.name} />)
                                    };
                                    return <i class={item.iconClass}></i>;
                                })(item.icon)
                            }
                            <span>{item.name}</span>
                        </div>
                    )
                })]}
                <div class="item" {...{ onClick: loginOut }}>
                    <i class="el-icon-switch-button"></i>
                    <span>{lang.logout}</span>
                </div>
            </div>
        </div>
    )
}

_Header.render = render;

_Header.install = (app: any) => {
    app.component(_Header.name, _Header);
};
export default _Header
