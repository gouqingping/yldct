/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-05 16:40:50
 * @LastEditors  : Pat
 * @LastEditTime : 2020-08-06 08:50:59
 */
module.exports = {
    // 设置头部栏配置
    header: {
        // 头栏标题
        title: "MIS测试系统",
        // 头栏图标，没有不显示
        icon: "./favicon.ico",
        // 头栏背景色
        backgroundColor: "#000",
        // 头栏字体色
        textColor: "white",
        // 头栏标题大小
        fontSize: "16px",
        // 头栏高度
        height: "36px",
        // 右边按钮集合
        bar: [
            {
                // 只能为boolen\null\undefined\function, 按钮点击后执行的方法
                event: null,
                // 按钮显示名称
                name: "测试",
                // 按钮显示图标，没有不显示
                icon: "",
                // 按钮图标样式
                iconClass: "",
                // 按钮样式
                class: "",
            },
            {
                event: () => {
                    console.log(11111)
                },
                name: "测试2",
                icon: "",
                class: "",
            },

        ]
    },
    menu: {
        // menu 背景色
        backgroundColor: "rgba(0,0,0,0.6)",
        // menu 字体色
        textColor: "white",
        nav: {
            // 菜单背景色
            backgroundColor: "rgba(0,0,0,0)",
            // 菜单字体色
            textColor: "white",
            // 菜单选中字体色
            activeTextColor: "white",
        }
    }
}