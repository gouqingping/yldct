/*
 * @Autor        : Pat
 * @Description  : Refactored ElDropdown
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-28 14:37:56
 */
import { defineComponent, ref, App, PropType } from 'vue';
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from "element-plus";
import type { DropdownItemType } from "./type";
import "./scss/index.scss";
// Refactored ElDropdownItem to avoid adding the original method to report errors
// The original methods of some components of Element-plus are not exposed, 
// so you need to rewrite and define the original object types of the components to avoid error messages during development and use. 
const DropdownItem = ElDropdownItem as any;
// Initialization module
let _ElDropdown = defineComponent({
    name: '_ElDropdown',
    props: {
        // Component data transfer parameters
        data: {
            type: Array as PropType<DropdownItemType[]>,
            default: [{ key: "全部", value: "" }],
            required: true
        },
        // Component title transfer parameters
        // jsx format transfer node operation
        // Callback DropdownItemType type parameter
        // https://github.com/vuejs/jsx-next/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md
        vslot: {
            type: Function,
            default: (v: DropdownItemType) => (
                <span class="el-dropdown-link">
                    {v.key}<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            )
        },
        // Component item select transfer parameters
        itemClick: {
            type: Function,
            default: (v: DropdownItemType) => v
        }
    },
    // Initialization
    // Vue3.0 nitialization function
    // https://v3.cn.vuejs.org/guide/migration/attrs-includes-class-style.html#%E6%A6%82%E8%A7%88
    setup() {
        return {
            value: ref()
        }
    }
});
/**
 * @description: Initialization render function
 *               Node information required for rendering components
 *               https://v3.cn.vuejs.org/guide/migration/render-function-api.html#_3-x-%E8%AF%AD%E6%B3%95-2
 * @param {any} _ctx Vue prototype function object
 * @return {*}
 * @Date: 2021-01-28 14:26:18
 * @author: Pat
 */
_ElDropdown.render = function (_ctx: any): any {
    // setup DropdownItem components rendering parameters
    const setupItem = () => {
        if (_ctx.data.length > 0) {
            return _ctx.data.map((item: DropdownItemType) => {
                return (
                    <DropdownItem {...{
                        onClick: () => {
                            _ctx.value = item;
                            _ctx.itemClick(item);
                        }
                    }}>{item.key}</DropdownItem>
                )
            })
        }
        return;
    },
        // setup ElDropdownMenu components rendering parameters
        slots = {
            dropdown: () => {
                return (
                    <>
                        <ElDropdownMenu>
                            {setupItem()}
                        </ElDropdownMenu>
                    </>
                )
            }
        };
    // setup ElDropdown components rendering parameters
    return (
        <ElDropdown v-slots={slots} v-bind={_ctx.$attrs} v-model={_ctx.value}>
            {((v) => _ctx.vslot(v))(_ctx.value)}
        </ElDropdown>
    )
};

// Initialization current components
_ElDropdown.install = (app: App<Element>) => {
    app.component(_ElDropdown.name, _ElDropdown);
};
export default _ElDropdown;
