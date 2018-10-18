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

}
module.exports = {
    'GET /employ/employList': fn_employList,
    'POST /employ/add': fn_employAdd,
    'POST /employ/edit': fn_employEdit
}