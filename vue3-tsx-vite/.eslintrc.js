/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-12-29 11:32:37
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-19 13:54:26
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
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "legacyDecorators":true
        }
    },
}