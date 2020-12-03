<!--
 * @Autor        : Pat
 * @Description  : VM
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-03-27 19:40:49
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-03 17:37:59
 -->
# Obsx
数据单向状态管理工具

## 调用方式
```JavaScript
import Obsx from "@/shared/Obsx";
const $Obsx = new Obsx({
    data:{
        testObs:1
    },
    watcher:{
        testObs:(value)=>{
            console.log(`testObs value:${value}`);
        }
    }
});
$Obsx.testObs = 2; // testObs value:2
```

### setOptions(Object{data:Object,watcher:Object}) 设置观察条件
```JavaScript
$Obsx.setOptions({
    data:{
        options:1
    },
    watcher:{
        options:(value)=>{
            console.log(`options value:${value}`);
        }
    }
})
```

### setData(Object) 设置数据
```JavaScript
$Obsx.setData({
    testA:0,
    textB:1
});
```

### setWatcher(Object) 设置多个观察
```JavaScript
$Obsx.setWatcher({
    testA:(value)=>{ console.log(`testA value:${value}`)},
    textB:(value)=>{ console.log(`textB value:${value}`)}
});
```

### watcher(String，Function) 设置单个观察
```JavaScript
$Obsx.watcher(testA,(value)=>{ console.log(`testA value:${value}`)});
```
