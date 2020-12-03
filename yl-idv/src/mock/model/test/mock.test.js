/*
 * @Autor        : Pat
 * @Description  : 
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2020-04-26 14:37:30
 * @LastEditors  : Pat
 * @LastEditTime : 2020-04-26 15:44:27
 */
const Mock = require('mockjs');
const rurl = '/sys/login';
const rtype = 'get';
let Random = Mock.Random

const cb = () => {
    return Mock.mock({
        code: 200,
        msg: 'success',
        "result": {
            "userInfo": {
                "id": Random.id(),
                "username": Random.word(),
                "realname": Random.cname(),
                "avatar": Random.image('200x200'),
                "birthday": Random.datetime('yyyy-MM-dd HH:mm:ss'),
                "sex|0-1": 0,
                "email": Random.email(),
                "phone": Mock.mock({ "number|13000000000-19999999999": 13000000000 }).number,
                "status|0-1": 0,
                "createTime": Random.datetime('yyyy-MM-dd HH:mm:ss'),
                "updateTime": Random.datetime('yyyy-MM-dd HH:mm:ss'),
                "type|0-5": 0
            },
            "token": Random.guid()
        },
    })
}

export {
    rurl,
    rtype,
    cb,
}