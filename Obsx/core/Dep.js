/*
 * @Autor        : Pat
 * @Description  : Dep
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-07-09 09:32:10
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-01 11:36:52
 */
export default class Dep {
    constructor() {
        this.subs = [];
        this.target = null
    }
    /**
     * @description: 添加子节点
     * @param {Object} sub
     * @Date: 2020-12-01 11:35:57
     * @author: Pat
     */
    addSub(sub) { this.subs.push(sub); }
    /**
     * @description: 属性变化通知 Watcher 执行更新视图函数
     * @param {Function} callback
     * @Date: 2020-12-01 11:36:18
     * @author: Pat
     */
    notify(callback) {
        // 属性变化通知 Watcher
        this.subs.forEach(sub => {
            // 执行更新视图函数
            sub.update();
            if (callback) { 
                callback(sub.prop, sub.value)
            }
        })
    }
}