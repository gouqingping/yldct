/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-08-03 11:07:19
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-03 17:27:28
 */
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const Sysinit = require("p.fs.amb");
new Sysinit.init();
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    lintOnSave: false,
    chainWebpack: config => {
        config
            .entry('index')
            .add('babel-polyfill')
            .end();
        // 配置别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@img", resolve("src/assets/images"))
            .set("@css", resolve("src/assets/styles/css"))
            .set("@scss", resolve("src/assets/styles/scss"));
        // 生产环境配置
        if (isProduction) {
            // 删除预加载
            config.plugins.delete('preload');
            config.plugins.delete('prefetch');
            // 压缩代码
            config.optimization.minimize(true);
            // 分割代码
            config.optimization.splitChunks({
                chunks: 'all'
            })
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            // 为生产环境修改配置...
            config.plugins.push(
                //生产环境自动删除console
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            //warnings: false,
                            drop_debugger: true,
                            drop_console: true,
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                })
            );
        }
    },
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        loaderOptions:{
            postcss:{
                //给postcss-loader传递选项
                plugins:[
                    new require('postcss-px-to-viewport')({
                        unitToConvert: 'px', //需要转换的单位，默认为"px"；
					    viewportWidth: 1920, //设计稿的视口宽度
					    viewportHeight: 1080, //设计稿的视口宽度
					    unitPrecision: 3, //单位转换后保留的小数位数
					    propList: ['*'], //要进行转换的属性列表,*表示匹配所有,!表示不转换
					    viewportUnit: 'vw', //转换后的视口单位
					    fontViewportUnit: 'vw', //转换后字体使用的视口单位
					    selectorBlackList: [], //不进行转换的css选择器，继续使用原有单位
					    minPixelValue: 1, //设置最小的转换数值
					    mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
					    replace: true, //是否直接更换属性值，而不添加备用属性
					    exclude: [/node_modules/] //忽略某些文件夹下的文件
                    })
                ]
            }
        }
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    devServer: {
        open: true, // 自动开启浏览器
        proxy: {
            '/api': {
                target: "http://www.webmap.cn",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    }
}