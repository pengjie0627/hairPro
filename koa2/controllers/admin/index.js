const db = require('../../mysql/utils');

var fn_login = async(ctx, next) => {
    // 获取账号信息
    let loginName = ctx.request.query.userName
    let loginPassword = ctx.request.query.password
    // 检查数据库表是否存在
    let employTable = await db.query('show tables like "employ"')
    if (employTable.length === 0) {// 表不存在
        console.log('员工表不存在,正在创建')
        await db.createTable(require('../mysql/table').employ)
        await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('admin','13838543062','2018-09-30','admin','店长账号','1','1')`)
        console.log('店长账号创建成功')
    } else { // 表存在
        console.log('员工表存在')
    }
    let customTable = await db.query('show tables like "custom"')
    if (customTable.length === 0) {// 表不存在
        console.log('顾客表不存在,正在创建')
        await db.createTable(require('../mysql/table').custom)
    } else { // 表存在
        console.log('顾客表存在')
    }
    // 获取数据库表admin信息
    let adminArr = await db.query(`SELECT * FROM employ WHERE name = '${loginName}' AND password = '${loginPassword}'`)// 引号一定需要
    if (adminArr.length > 0) {
        if (adminArr[0].auth === 0) {
            const response = require('../dao/baseResponse')
            response.data = {userName: loginName}
            response.message = '该用户无权限，请联系店长'
            response.success = false
            response.total = 0
            ctx.session.userinfo = '';
            ctx.response.body = response
        } else {
            console.log('login success')
            // 生成cookie保存到数据库
            let cookies = `${loginName}#${loginPassword}#${Math.random(20)}`
            await db.update(`update employ set cookies = '${cookies}' where name ='${loginName}'`)
            const response = require('../dao/baseResponse')
            response.data = {userName: loginName, permission: adminArr[0].checked}
            response.success = true
            response.total = 0
            ctx.session.userinfo = cookies;
            ctx.response.body = response
        }
    } else {
        console.log('login failed')
        const response = require('../dao/baseResponse')
        response.data = {userName: loginName}
        response.success = false
        response.message = '用户名或者密码不正确'
        response.total = 0
        ctx.response.body = response
    }
};
var fn_register = async(ctx, next) => {
    // 获取账号信息
    let loginName = ctx.request.query.userName
    let loginPassword = ctx.request.query.password
    // 检查数据库表是否存在
    let employTable = await db.query('show tables like "employ"')
    if (employTable.length === 0) {// 表不存在
        console.log('员工表不存在,正在创建')
        await db.createTable(require('../mysql/table').employ)
        await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('admin','13838543062','2018-09-30','admin','店长账号','1','1')`)
        console.log('店长账号创建成功')
    } else { // 表存在
        console.log('员工表存在')
    }
    let customTable = await db.query('show tables like "custom"')
    if (customTable.length === 0) {// 表不存在
        console.log('顾客表不存在,正在创建')
        await db.createTable(require('../mysql/table').custom)
    } else { // 表存在
        console.log('顾客表存在')
    }
    // 获取数据库表admin信息
    let adminArr = await db.query(`SELECT * FROM employ WHERE name = '${loginName}' AND password = '${loginPassword}'`)// 引号一定需要
    if (adminArr.length > 0) {
        if (adminArr[0].auth === 0) {
            const response = require('../dao/baseResponse')
            response.data = {userName: loginName}
            response.message = '该用户无权限，请联系店长'
            response.success = false
            response.total = 0
            ctx.session.userinfo = '';
            ctx.response.body = response
        } else {
            console.log('login success')
            // 生成cookie保存到数据库
            let cookies = `${loginName}#${loginPassword}#${Math.random(20)}`
            await db.update(`update employ set cookies = '${cookies}' where name ='${loginName}'`)
            const response = require('../dao/baseResponse')
            response.data = {userName: loginName, permission: adminArr[0].checked}
            response.success = true
            response.total = 0
            ctx.session.userinfo = cookies;
            ctx.response.body = response
        }
    } else {
        console.log('login failed')
        const response = require('../dao/baseResponse')
        response.data = {userName: loginName}
        response.success = false
        response.message = '用户名或者密码不正确'
        response.total = 0
        ctx.response.body = response
    }
};
module.exports = {
    'GET /login': fn_login,
    'GET /register': fn_register
};