/*
 * @Autor        : Pat
 * @Description  : Test Mock
 * @Email        : gouqingping@yahoo.com
 * @Date         : 2021-01-26 11:26:30
 * @LastEditors  : Pat
 * @LastEditTime : 2021-01-27 10:15:50
 */
import Mock, { setupMock, createDataType } from "../_utlis";
let Random = Mock.Random;
export default setupMock('/api/account/getAccountInfo', 'get', createDataType({
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
}));
