const db = require('../../mysql/utils');
const database = require('../../mysql/database.js')
var fn_login = async(ctx, next) => {
    // 获取账号信息
    let loginName = ctx.request.query.userName
    let loginPassword = ctx.request.query.password
    let userTable =  await db.query('show tables like "user"')
    if (userTable.length === 0) {// 表不存在
        console.log('用户表不存在,正在创建')
        await db.createTable(require('../../mysql/table').user)
    } else { // 表存在
        console.log('用户表存在')
    }
    // 门店表检查
    let shopListTable = await db.query('show tables like "shopList"')
    if (shopListTable.length === 0) {// 表不存在
        console.log('门店表不存在,正在创建')
        await db.createTable(require('../../mysql/table').shopList)
    } else { // 表存在
        console.log('门店表表存在')
    }
    // 员工表检查
    let employTable = await db.query('show tables like "employ"')
    if (employTable.length === 0) {// 表不存在
        console.log('员工表不存在,正在创建')
        await db.createTable(require('../../mysql/table').employ)
        // await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('admin','13838543062','2018-09-30','admin','店长账号','1','1')`)
        console.log('店长账号创建成功')
    } else { // 表存在
        console.log('员工表存在')
    }
    // 客户表检查
    let customTable = await db.query('show tables like "custom"')
    if (customTable.length === 0) {// 表不存在
        console.log('顾客表不存在,正在创建')
        await db.createTable(require('../../mysql/table').custom)
    } else { // 表存在
        console.log('顾客表存在')
    }
    let adminArr = await db.query(`SELECT * FROM user WHERE userName = '${loginName}' AND userPassword = '${loginPassword}'`)// 引号一定需要
    if (adminArr.length > 0) {// 店长
        let cookies = `${loginName}#${loginPassword}#${Math.random(20)}#${Math.random(20)}#${Math.random(20)}`
            await db.update(`update user set cookies = '${cookies}' where userName ='${loginName}'`)
            const response = require('../../dao/baseResponse')
            response.data = {userName: loginName}
            response.success = true
            response.total = 0
            ctx.session.userinfo = cookies;
            ctx.response.body = response
    } else {
        // 从员工表中查询
        let employAccount = await db.query(`SELECT * FROM employ WHERE loginName = '${loginName}' AND loginPwd = '${loginPassword}'`)
        if (employAccount.length > 0) {
            let cookies = `${loginName}#${loginPassword}#${Math.random(20)}#${Math.random(20)}#${Math.random(20)}`
            await db.update(`update employ set cookies = '${cookies}' where mobile ='${loginName}'`)
            const response = require('../../dao/baseResponse')
            response.data = {userName: loginName}
            response.success = true
            response.total = 0
            ctx.session.userinfo = cookies;
            ctx.response.body = response
        } else {
            console.log('登录失败')
            const response = require('../../dao/baseResponse')
            response.data = {userName: loginName}
            response.success = false
            response.message = '用户名或者密码不正确'
            response.total = 0
            ctx.response.body = response
        }
    }
};
var fn_register = async(ctx, next) => {
    // 获取账号信息
    let loginName = ctx.request.query.userName
    let loginPassword = ctx.request.query.password
    let userTable =  await db.query('show tables like "user"')
    if (userTable.length === 0) {// 表不存在
        console.log('用户表不存在,正在创建')
        await db.createTable(require('../../mysql/table').user)
    } else { // 表存在
        console.log('用户表存在')
    }
    // 门店表检查
    let shopListTable = await db.query('show tables like "shopList"')
    if (shopListTable.length === 0) {// 表不存在
        console.log('门店表不存在,正在创建')
        await db.createTable(require('../../mysql/table').shopList)
    } else { // 表存在
        console.log('门店表表存在')
    }
    // 员工表检查
    let employTable = await db.query('show tables like "employ"')
    if (employTable.length === 0) {// 表不存在
        console.log('员工表不存在,正在创建')
        await db.createTable(require('../../mysql/table').employ)
        // await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('admin','13838543062','2018-09-30','admin','店长账号','1','1')`)
        console.log('店长账号创建成功')
    } else { // 表存在
        console.log('员工表存在')
    }
    // 客户表检查
    let customTable = await db.query('show tables like "custom"')
    if (customTable.length === 0) {// 表不存在
        console.log('顾客表不存在,正在创建')
        await db.createTable(require('../../mysql/table').custom)
    } else { // 表存在
        console.log('顾客表存在')
    }
    // 获取数据库表admin信息
    let result = await db.add(`insert into user(userName,userPassword,userType) values('${loginName}','${loginPassword}','admin')`)// 引号一定需要
    if (result.msg) {
        console.log('注册失败')
        const response = require('../../dao/baseResponse')
        response.data = {userName: loginName}
        response.success = false
        response.message = '重复的用户名(手机号)'
        response.total = 0
        ctx.response.body = response
    } else {
        const response = require('../../dao/baseResponse')
        response.data = {userName: loginName}
        response.message = '注册成功'
        response.success = true
        response.total = 0
        ctx.session.userinfo = '';
        ctx.response.body = response
    }
};

/**
 * 检查表存在
 */
// function checkTableExist() {
//     return new Promise(((resolve, reject) => {
//         // 用户表检查
//         let userTable =  db.query('show tables like "user"')
//         if (userTable.length === 0) {// 表不存在
//             console.log('用户表不存在,正在创建')
//             db.createTable(require('../../mysql/table').user)
//         } else { // 表存在
//             console.log('用户表存在')
//         }
//         // 门店表检查
//         let shopListTable = db.query('show tables like "shopList"')
//         if (shopListTable.length === 0) {// 表不存在
//             console.log('门店表不存在,正在创建')
//             db.createTable(require('../../mysql/table').shopList)
//         } else { // 表存在
//             console.log('门店表表存在')
//         }
//         // 员工表检查
//         let employTable = db.query('show tables like "employ"')
//         if (employTable.length === 0) {// 表不存在
//             console.log('员工表不存在,正在创建')
//             db.createTable(require('../../mysql/table').employ)
//             // await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('admin','13838543062','2018-09-30','admin','店长账号','1','1')`)
//             console.log('店长账号创建成功')
//         } else { // 表存在
//             console.log('员工表存在')
//         }
//         // 客户表检查
//         let customTable = db.query('show tables like "custom"')
//         if (customTable.length === 0) {// 表不存在
//             console.log('顾客表不存在,正在创建')
//             db.createTable(require('../../mysql/table').custom)
//         } else { // 表存在
//             console.log('顾客表存在')
//         }
//         resolve()
//     }))
//
// }
module.exports = {
    'GET /login': fn_login,
    'GET /register': fn_register
};