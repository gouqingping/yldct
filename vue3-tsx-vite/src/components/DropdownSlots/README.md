<!--
 * @Autor        : Pat
 * @Description  : DropdownSlots MD
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-28 14:31:19
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-28 14:56:18
-->
### DropdownSlots

下拉菜单组件,将动作或菜单折叠到下拉菜单中。 (<a href="https://element-plus.org/#/zh-CN/component/dropdown#dropdown-attributes">Element-plus Dropdown</a> 二次封装，包含 `Dropdown` 所有原有功能)

### 扩展参数说明 （Props）

|参数|说明|类型|必填|默认值|
|:--------|:-----|:----|:----|:----|
|data|组件数据传输参数|Array as PropType<DropdownItemType[]>|Yes|[{ key: "全部", value: "" }]|
|vslot|组件标题传输参数,jsx格式传输节点操作,回调DropdownItemType类型参数|Function|No|`(v: DropdownItemType) => ( <span class="el-dropdown-link"> {v.key}<i class="el-icon-arrow-down el-icon--right"></i> </span> ) `|
|itemClick|点击菜单项触发的事件回调|Function|No|`(v: DropdownItemType) => v`|

### 基础用法

```javascript
import DropdownSlots, { VDropdownItemType } from "/@/components/DropdownSlots";
<DropdownSlots vslot={(v: VDropdownItemType) => (
    <span class="el-dropdown-link">
        {v ? v.key : "全部"}
        <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
)} {...{
    trigger: "hover",
    data: [
        { key: 1, value: "test" },
        { key: 2, value: "test2" }
    ]
}}></DropdownSlots>
```