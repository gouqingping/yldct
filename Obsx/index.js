/*
 * @Autor        : Pat
 * @Description  : Vm
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-11-17 16:51:27
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-04 15:57:08
 */
import observer from "./core/observer.js"
import { isType,juxtaposeObject } from "./core/utils.js"
export default class Obsx { 
    constructor(opt) {
        this.$data = {};
        this.$watcher_ = {};
        this.$init_(opt || { data: {}, watcher: {} });
        return this;
    }
    /**
     * @description: 设置条件
     * @param {Object} opt {data,watcher}
     * @return {*}
     * @Date: 2020-11-26 17:01:57
     * @author: Pat
     */
    setOptions(opt) { 
        this.$init_(opt);
        return this;
    }
    /**
     * @description: 设置观察
     * @param {Object} watherData
     * @Date: 2020-11-26 16:38:58
     * @author: Pat
     */
    setWatcher(watherData) {
        if (isType(watherData, "Object")) {
            this.$watcher_ = Object.assign(this.$watcher_, watherData);
            Object.keys(watherData).map(item => { 
                this.watcher(item,watherData[item])
            })
        } else { 
            console.error(`Wather data not Object`);
        }
        return this;
    }
    /**
     * @description: 单个参数观察
     * @param {*} itemName
     * @param {*} callback
     * @return {*}
     * @Date: 2020-12-03 16:32:33
     * @author: Pat
     */
    watcher(itemName, callback = e=>e) {
        if(isType(itemName, "Object")||!itemName){ 
            Object.keys(itemName).map(item => { 
                this.watcher(item, itemName[item]);
            })
            return;
        }
        if (isType(itemName, "String")) {
            addEventListener("obsxEvent" + itemName, e => {
                if (e.key == itemName && typeof callback == "function") {
                    callback(e.newValue)
                }
            });
        } else { 
            console.error(`Watcher key type is not String`);
        }
        return this;
    }
    /**
     * @description: 设置数据
     * @param {Object} data
     * @Date: 2020-11-26 16:48:44
     * @author: Pat
     */
    setData(data) {
        if (isType(data, "Object")) {
            this.$data = Object.assign(this.$data, data)
        } else { 
            console.error(`data not Object`);
        }
        this.observerData_();
        return this;
    }
    /**
     * @description: 初始化Vm
     * @param {Object} options {data,watcher}
     * @Date: 2020-11-26 17:01:04
     * @author: Pat
     */
    $init_(options) {
        if (juxtaposeObject(options, { data: ""})) {
            const { data, watcher } = options;
            this.$data = Object.assign(this.$watcher_, isType(data, 'object') ? data : {});
            this.$watcher_ = Object.assign(this.$watcher_, isType(watcher, 'object') ? watcher : {});
            this.observerData_();
        } else { 
            console.error(`Options type is not Object{data,watcher}`);
        }
    }
    /**
     * @description: 设置观察者
     * @Date: 2020-11-26 17:00:36
     * @author: Pat
     */
    observerData_() { 
        Object.keys(this.$data).forEach(key => {
            this.proxyKeys_(key);
            this.watcher(key, e => e);
        });
        observer(this.$data);
        setTimeout(() => Object.keys(this.$watcher_).forEach(key => {
            this.watcher( key, this.$watcher_[key])
        }), 100);
    }
    /**
     * @description: 给对象绑定get，set事件
     * @param {String} key 参数名称
     * @Date: 2020-11-26 16:59:18
     * @author: Pat
     */
    proxyKeys_ (key) {
        let self = this;
        const ITEM_EVENT = new Event("obsxEvent"+key);
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function getter() {
                return self.$data[key];
            },
            set: function setter (newVal) {
                self.$data[key] = newVal;
                ITEM_EVENT.key = key;
                ITEM_EVENT.newValue = newVal;
                dispatchEvent(ITEM_EVENT);
            }
        });
    }
}