const db = require('../../mysql/utils');
const database = require('../../mysql/database.js')
const fs = require('fs')
const path = require('path');
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
        // await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('user','13838543062','2018-09-30','user','店长账号','1','1')`)
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
        // await db.add(`insert into employ(name,mobile,dateTime,password,remark,auth,checked) values('user','13838543062','2018-09-30','user','店长账号','1','1')`)
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
var fn_shopImg = async (ctx,next) => {
    console.log(ctx.session.userinfo)
    // 创建可读流
    const reader = fs.createReadStream(ctx.request.files.file.path);
    let filePath = ''
    let fileStamp = ''
    let dir = ''
    if (ctx.request.url.indexOf('/user') >= 0) {
        dir = path.join(__dirname, '../../img/userImg/')
    } else if (ctx.request.url.indexOf('/employ') >= 0) {
        dir = path.join(__dirname, '../../img/employImg/')
    } else if (ctx.request.url.indexOf('/custom') >= 0) {
        dir = path.join(__dirname, '../../img/customerImg/')
    } else if (ctx.request.url.indexOf('/subAdmin') >= 0) {
        dir = path.join(__dirname, '../../img/subAdminImg/')
    } else {
        dir = path.join(__dirname, '../../img/otherImg/')
    }
    if (ctx.request.files.file.type.indexOf('jpeg') > 0 || ctx.request.files.file.type.indexOf('JPEG') > 0) {
        fileStamp = new Date().getTime() + '.jpg'
        filePath = dir + fileStamp;
    } else {
        fileStamp = new Date().getTime() + '.png'
        filePath = dir + fileStamp;
    }
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // 注意，这里的返回不带目录名称
    var imgUrl = `${ctx.request.header.origin.substring(0,7)}${ctx.request.header.host}/${fileStamp}`
    const response = require('../../dao/baseResponse')
    response.data = imgUrl
    response.success = true
    response.status = 200
    response.total = 0
    ctx.response.body = response
}
var fn_userType = async (ctx) => {
    await db.update(`update user set userType = '${ctx.request.query.type}' where userName = ${ctx.request.query.mobile}`)
    const response = require('../../dao/baseResponse')
    response.data = ''
    response.success = true
    response.status = 200
    response.total = 0
    response.message = '已切换到店主状态'
    ctx.response.body = response
}
module.exports = {
    'GET /user/login': fn_login,
    'GET /user/register': fn_register,
    'GET /user/userType': fn_userType,
    'POST /user/shopImg': fn_shopImg
};