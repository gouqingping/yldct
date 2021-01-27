/*
 * @Autor        : Pat
 * @Description  : Set Sub Menu
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-19 10:41:24
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 16:00:51
 */

import { ElSubmenu, ElMenuItem } from "element-plus";
import { PropType, defineComponent } from "vue";
import { RouteRecordNormalized, LocationAsPath } from "vue-router";
let SidebarItem = defineComponent({
    name: "SubmenuSlots",
    props: {
        menu: {
            type: Object as PropType<RouteRecordNormalized>,
            default: () => ({}),
        },
        parentPath: {
            type: String,
            default: "",
        },
    },
    setup(props: any) {
        const { menu, parentPath } = props,
            { meta, children } = menu,
            slots = {
                title: () => {
                    return (
                        <>
                            <i class={`${meta.icon ? meta.icon : ""} iconfont`}></i>
                            <span class="title">{meta.title ? meta.title : ""}</span>
                        </>
                    )
                }
            };
        //是否显示菜单
        function isShowMenu(item: RouteRecordNormalized) {
            const { meta } = item;
            if (meta && meta.isMenu) {
                return true;
            } else {
                return false;
            }
        }

        function hasMoreThanOneShowChildren(
            children: Array<RouteRecordNormalized>
        ) {
            let showChildNum = 0;
            if (children) {
                children.forEach((item: RouteRecordNormalized) => {
                    const {
                        meta: { isMenu },
                    } = item;
                    if (isMenu) {
                        showChildNum++;
                    }
                });
            }
            return showChildNum > 0;
        }
        function getFullPath(val: LocationAsPath) {
            if (!props.parentPath) {
                return val;
            } else {
                return val ? `${props.parentPath}/${val}` : props.parentPath;
            }
        }

        if (isShowMenu(menu) && meta.title) {
            if (hasMoreThanOneShowChildren(children)) {
                return () => (
                    <>
                        <ElSubmenu {...{ index: parentPath, key: parentPath }} class={meta.class ? meta.class : ""} v-slots={slots}>
                            {[
                                children.map((item: any, index: number) => {
                                    return (<SidebarItem {...{ menu: item, parentPath: getFullPath(item.path), key: `${item.path}_${index}` }}></SidebarItem>)
                                })
                            ]}
                        </ElSubmenu>
                    </>
                )
            }
            return () => <ElMenuItem {...{ index: parentPath, key: parentPath }} class={meta.class ? meta.class : ""}>{slots.title()}</ElMenuItem>
        }
        return;
    },
});

SidebarItem.install = (app: any) => {
    app.component(SidebarItem.name, SidebarItem);
};

export default SidebarItem;
