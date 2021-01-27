<!--
 * @Autor        : Pat
 * @Description  : Menu COnfig
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 10:08:39
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-26 10:44:57
-->
# Nav
Mis系统基础公共组件

## 参数说明
### isCollapse
是否收起菜单树显示图标

`type：Boolean`
`default: false`

### backgroundColor
菜单树导航栏默认背景色

`type：HsxString`
`default: rgba(0,0,0,0)`

### textColor
菜单树导航文字颜色

`type：HsxString`
`default: white`

### activeTextColor
菜单树导航选中文字颜色

`type：HsxString`
`default: white`

### fontSize
横菜单导航文字大小

`type：HsxString`
`default: ""`

### subTitle
横标题数组

`type：Array`
`default: ()=>[]`
```javascript
[
    {
        // 图标地址或者bese64
        icon: "",
        // 图标样式（字体图标只能设置iconClass）
        iconClass: "el-icon-setting",
        // 标题显示名称
        name: "设置",
        // 标题点击事件回调
        event: (e: MouseEvent, _ctx: WindowProxy) => {
            console.log(e, _ctx)
        }
    }
]
```

### type
MIS栏类型

`type：String`
`default: left (left or top)`

### style
自定义样式

`type：String`

### class
自定义样式

`type：String`

### id / ref
自定义参数

`type：String`

## VueRouter调用方式

```javascript 
    const Layout = () => import("/@/components/Nav");
    export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/home',
        name: 'Home',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import("/@/page/Home"),
                meta: {
                    isMenu: false,
                }
            }
        ],
        meta: {
            // 菜单显示名称
            title: "首页",
            // 图标
            icon: "el-icon-s-home",
            // 菜单自定义样式
            class: "",
            // 设置为菜单 true or false
            isMenu: true,
            // 扩展项
            extend: ""
        }
    }]
```