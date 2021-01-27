<!--
 * @Autor        : Pat
 * @Description  : Menu COnfig
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 10:08:39
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-26 10:36:51
-->
# Header
Mis系统横菜单树组件

## 参数说明
### isCollapse
是否收起菜单树显示图标

`type：Boolean`
`default: false`

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
### onSetCollapse
展示收起纵菜单树回调,通过Header emit进行数据传输

`type：Function`
```javascript
function setCollapse(collapse: boolean) {
    currentCollapse.value = collapse;
}
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

## 调用方式

```javascript 
    import Header from "/@/components/Header";
    <Header {...{ onSetCollapse: setCollapse, subTitle, fontSize, isCollapse, type }} />
```