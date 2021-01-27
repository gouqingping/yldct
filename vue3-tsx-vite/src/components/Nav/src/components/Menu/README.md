<!--
 * @Autor        : Pat
 * @Description  : Menu COnfig
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 10:08:39
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-26 10:26:15
-->
# Menu
Mis系统菜单树组件

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

## 调用方式

```javascript 
    import Menu from "/@/components/Menu";
    <Menu {...{ isCollapse, backgroundColor, textColor, activeTextColor, type }} />
```