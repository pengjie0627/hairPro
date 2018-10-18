const Db = require('../../mysql/utils.js')
var fn_employList = async (ctx) => {
    let employList = await Db.query(`select * from employ`)
    let body = require('../../dao/baseResponse.js')
    body.message = '门店创建成功'
    body.total = employList.length
    body.success = true
    body.data = employList
    ctx.response.body = body
}
var fn_employAdd = async (ctx) => {
    let employ = {
        name: ctx.request.body.name,
        mobile: ctx.request.body.mobile,
        dateTime: ctx.request.body.dateTime,
        belongShopId: ctx.request.body.belongShopId,
        loginName: ctx.request.body.loginName,
        loginPwd: ctx.request.body.loginPwd,
        idCard: ctx.request.body.idCard,
        bankCard: ctx.request.body.bankCard,
        img: ctx.request.body.img,
        salary: ctx.request.body.salary,
        introducePercent: ctx.request.body.introducePercent,
        remark: ctx.request.body.remark,
        loginAuth: ctx.request.body.loginAuth,
        customCheckedAuth: ctx.request.body.customCheckedAuth,
        otherEmployCheckAuth: ctx.request.body.otherEmployCheckAuth
    }
    await Db.add(`insert into 
    employ(
    name,
    mobile,
    dateTime,
    belongShopId,
    loginName,
    loginPwd,
    idCard,
    bankCard,
    img,
    salary,
    introducePercent,
    remark,
    loginAuth,
    customCheckedAuth,
    otherEmployCheckAuth)
    values(
    '${employ.name}',
    '${employ.mobile}',
    '${employ.dateTime}',
    '${employ.belongShopId}',
    '${employ.loginName}',
    '${employ.loginPwd}',
    '${employ.idCard}',
    '${employ.bankCard}',
    '${employ.img}',
    '${employ.salary}',
    '${employ.introducePercent}',
    '${employ.remark}',
    ${parseInt(employ.loginAuth)},
    ${parseInt(employ.customCheckedAuth)},
    ${parseInt(employ.otherEmployCheckAuth)})`)
    let curEmploy = await Db.query(`select * from employ where mobile = '${employ.mobile}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '员工创建成功'
    body.total = 0
    body.success = true
    body.data = curEmploy
    ctx.response.body = body
}
var fn_employEdit = async (ctx) => {
    let employ = {
        name: ctx.request.body.name,
        oldMobile: ctx.request.body.oldMobile,
        mobile: ctx.request.body.mobile,
        dateTime: ctx.request.body.dateTime,
        belongShopId: ctx.request.body.belongShopId,
        loginName: ctx.request.body.loginName,
        loginPwd: ctx.request.body.loginPwd,
        idCard: ctx.request.body.idCard,
        bankCard: ctx.request.body.bankCard,
        img: ctx.request.body.img,
        salary: ctx.request.body.salary,
        introducePercent: ctx.request.body.introducePercent,
        remark: ctx.request.body.remark,
        loginAuth: ctx.request.body.loginAuth,
        customCheckedAuth: ctx.request.body.customCheckedAuth,
        otherEmployCheckAuth: ctx.request.body.otherEmployCheckAuth
    }
    let curMobile = ''
    if (employ.oldMobile === employ.mobile) {
        curMobile = employ.mobile
    } else {
        curMobile = employ.oldMobile
    }
    await Db.add(`update 
    employ set
    name = '${employ.name}',
    mobile = '${employ.mobile}',
    dateTime = '${employ.dateTime}',
    belongShopId = '${employ.belongShopId}',
    loginName = '${employ.loginName}',
    loginPwd = '${employ.loginPwd}',
    idCard = '${employ.idCard}',
    bankCard = '${employ.bankCard}',
    img = '${employ.img}',
    salary = '${employ.salary}',
    introducePercent = '${employ.introducePercent}',
    remark = '${employ.remark}',
    loginAuth = ${parseInt(employ.loginAuth)},
    customCheckedAuth = ${parseInt(employ.customCheckedAuth)},
    otherEmployCheckAuth = ${parseInt(employ.otherEmployCheckAuth)} where mobile = '${curMobile}'`)
    let curEmploy = await Db.query(`select * from employ where mobile = '${employ.mobile}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '员工创建成功'
    body.total = 0
    body.success = true
    body.data = curEmploy
    ctx.response.body = body
}
var fn_employDtl = async (ctx) => {
    let curEmploy = await Db.query(`select * from employ where mobile = '${ctx.request.query.mobile}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '员工创建成功'
    body.total = 0
    body.success = true
    body.data = curEmploy
    ctx.response.body = body
}
var fn_employDelete = async function(ctx) {
    await Db.delete(`delete from employ where mobile = '${ctx.request.body.mobile}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '员工删除成功'
    body.total = 0
    body.success = true
    body.data = ''
    ctx.response.body = body
}
module.exports = {
    'GET /employ/employList': fn_employList,
    'GET /employ/dtl': fn_employDtl,
    'POST /employ/add': fn_employAdd,
    'POST /employ/edit': fn_employEdit,
    'POST /employ/delete': fn_employDelete
}