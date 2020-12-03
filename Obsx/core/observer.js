/*
 * @Autor        : Pat
 * @Description  : observer
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-09 09:06:59
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-01 11:35:38
 */
import Dep from "./Dep.js"
import { isType } from "@/shared/utils.js"
class Observer { 
    constructor(data, callback = {}) {
        this.data = data;
        this.walk(data,callback);
    }
    /**
     * @description: 添加数据，设置数据setter，getter
     * @param {Object} data 数据
     * @param {Function} callback 回调观察函数
     * @Date: 2020-12-01 11:29:41
     * @author: Pat
     */
    walk(data,callback) {
        var self = this;
        // 遍历数据设置数据setter，getter
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key], callback[key]);
        });
    }
    /**
     * @description: 设置数据setter，getter
     * @param {Object} data 数据
     * @param {String} key 需要观察的参数
     * @param {Any} val 旧的值
     * @param {Function} callback 回调观察函数
     * @Date: 2020-12-01 11:30:25
     * @author: Pat
     */
    defineReactive(data, key, val, callback) {
        let dep = new Dep();
        // var childObj = observe(val);
        // 给参数设置数据setter，getter
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function getter() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set: function setter(newVal) {
                if (isType(newVal,"array")) { 
                    // 新数据是数组则执行数组的添加删除方法
                    let arr = []
                    newVal.map(item => { 
                        arr.push(item)
                    })
                    val = arr;
                } else if (isType(newVal,"object")) { 
                    // 新数据是对象则执行对象的添加删除方法
                    let obj = {}
                    Object.keys(newVal).map(item => { 
                        obj[item] = newVal[item]
                    })
                    val = obj;
                } else  {
                    // 否则新数据直接赋值
                    val = newVal
                }
                // 属性变化通知 Watcher 
                // 执行更新视图函数
                dep.notify(callback);
            }
        });
    }
}
/**
 * @description: 抛出函数定义
 * @param {Any} value
 * @param {Function} callback 回调观察函数
 * @return {Observer}
 * @Date: 2020-12-01 11:32:11
 * @author: Pat
 */
export default function observe(value, callback) {
    if (!value || typeof value !== 'object') {
        return;
    }
    return new Observer(value,callback);
}