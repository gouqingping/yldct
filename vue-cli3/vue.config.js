const Sys = require("@bit/patgp.yldct.ambfs")
const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';
const cdn = {
    css: [],
    js: []
}

new Sys.init()
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 基本路径
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // assetsDir: "./",
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
    //indexPath: './',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    // 用于多页配置，默认是 undefined
    // pages: {
    //   index: {
    //     // 入口文件
    //     entry: 'src/main.js',　　/*这个是根入口文件*/
    //     // 模板文件
    //     template: 'public/index.html',
    //     // 输出文件
    //     filename: 'index.html',
    //     // 页面title
    //     title: 'Index Page'
    //   },
    //   // 简写格式
    //   // 模板文件默认是 `public/subpage.html`
    //   // 如果不存在，就是 `public/index.html`.
    //   // 输出文件默认是 `subpage.html`.
    //   subpage: 'src/main.js'　　　　/*注意这个是*/
    // },
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
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
            // 生产环境注入cdn
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = cdn;
                    return args;
                });
        }
    },
    configureWebpack: config => {
        if (isProduction) {
            // 用cdn方式引入
            config.externals = {
                'vue': 'Vue',
                'vuex': 'Vuex',
                'vue-router': 'VueRouter',
                'axios': 'axios'
            }
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
        } else {
            // 为开发环境修改配置...
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
        // css预设器配置项
        loaderOptions: {
            // pass options to sass-loader
            sass: {
                // 引入全局变量样式
                //data: ``
            }
        },
        // 启用 CSS modules for all css / pre-processor files.
        //modules: false,
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    devServer: {
        port: 8888,  // 端口
        open: true, // 自动开启浏览器
        compress: false, // 开启压缩
        proxy: {
            '/api': {
                target: "*",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        }
    }
}