/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-20 20:41:37
 * @LastEditors  : Pat
 * @LastEditTime : 2020-12-20 20:42:20
 */
module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "globals": {
        "process": true,
        "Plyr": true,
        "AMap": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "legacyDecorators":true
        }
    },
}