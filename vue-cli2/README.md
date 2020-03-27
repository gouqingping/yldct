<!--
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-02-19 15:31:14
 * @LastEditors  : Pat
 * @LastEditTime : 2020-02-19 19:10:27
 -->
# Vue Model 说明

**Vue cli 前端模板**

## amd

对应 ./src/config/app.js 的修改内容，以及打包名称，项目名称等。为api文件目录下的 *.js 作为支撑

## api

项目请求路径配置文件。
对应 package.json scripts 内环境命令做支撑。ENV_TYPE 对应 api 文件夹下的 js 文件

## build

项目打包目录

## config

项目配置目录

## node_modules

项目依赖目录

## src

项目Vue代码架构目录

    assets 资源
    components 组件
    router 定义路由相关的配置
    view 视图
    app.vue 应用主组件
    main.js 入口文件


## static

项目静态资源（不会被webpack处理）

    直接被复制到最终的打包目录（默认是dist/static）下。
    必须使用绝对路径引用这些文件，这是通过在 config.js 文件中的build.assetsPublicPath 和 build.assetsSubDirectory 连接来确定的。

    任何放在 static/ 中文件需要以绝对路径的形式引用/static/[filename]。


# Other Info

## package.json scripts  自定义说明

    ENV_TYPE=dev           对应 api 文件夹下的 js 文件，区分项目开发环境（请求后台路径配置文件）
    SYS_TYPE=enterprise    对应区别项目模式,如：enterprise 为教育机构模式 其他为企业机构模式。如需其他模式自行添加即可

## 页面样式规范

    尽量采用scss统一管理页面样式
    比如定义整体颜色在scss 文件下创建 config/color.scss 
    列：$defultColor:#0399f9; .color{color:$defultColor}

## 页面代码规范

    1.提高代码复用性（模块化处理）
    2.提高整体能动性（尽量采取 src/config.app 配置联动区域模块）
    3.减少代码冗余性（尽量采用组件化，小至标题）