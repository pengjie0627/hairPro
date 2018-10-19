const Db = require('../../mysql/utils.js')
var fn_customList = async (ctx) => {
    let customList = await Db.query(`select * from custom`)
    let body = require('../../dao/baseResponse.js')
    body.message = ''
    body.total = customList.length
    body.success = true
    body.data = customList
    ctx.response.body = body
}
var fn_customEdit = async (ctx) => {
    let custom = {
        name: ctx.request.body.name,
        mobile: ctx.request.body.mobile,
        hairTime: ctx.request.body.hairTime,
        vipLevel: ctx.request.body.vipLevel,
        introduceEmployMobile: ctx.request.body.introduceEmployMobile,
        cutHairEmployMobile: ctx.request.body.cutHairEmployMobile,
        img: ctx.request.body.img,
        cutHairPrice:ctx.request.body.cutHairPrice,
        remark: ctx.request.body.remark
    }
    await Db.update(`update custom set 
        name = '${custom.name}',
        hairTime = '${custom.hairTime}',
        vipLevel = '${custom.vipLevel}',
        introduceEmployMobile = '${custom.introduceEmployMobile}',
        cutHairEmployMobile = '${custom.cutHairEmployMobile}',
        hairImg = '${custom.img}',
        cutHairPrice = ${custom.cutHairPrice},
        remark = '${custom.remark}'
        where mobile = '${custom.mobile}'
    `)
    let customList = await Db.query(`select * from custom where mobile = '${custom.mobile}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '编辑客户成功'
    body.total = customList.length
    body.success = true
    body.data = customList
    ctx.response.body = body
}
var fn_customAdd = async (ctx) => {
    let custom = {
        name: ctx.request.body.name,
        mobile: ctx.request.body.mobile,
        hairTime: ctx.request.body.hairTime,
        vipLevel: ctx.request.body.vipLevel,
        introduceEmployName: ctx.request.body.introduceEmployName,
        introduceEmployMobile: ctx.request.body.introduceEmployMobile,
        cutHairEmployName: ctx.request.body.cutHairEmployName,
        cutHairEmployMobile: ctx.request.body.cutHairEmployMobile,
        img: ctx.request.body.img,
        cutHairPrice:ctx.request.body.cutHairPrice,
        remark: ctx.request.body.remark
    }
    let addCustom = await Db.add(`insert into custom(
        name,
        mobile,
        hairTime,
        vipLevel,
        introduceEmployMobile,
        cutHairEmployMobile,
        hairImg,
        cutHairPrice,
        remark
        )
        values(
        '${custom.name}',
        '${custom.mobile}',
        '${custom.hairTime}',
        '${custom.vipLevel}',
        '${custom.introduceEmployMobile}',
        '${custom.cutHairEmployMobile}',
        '${custom.img}',
        ${custom.cutHairPrice},
        '${custom.remark}'
        )
        `)
    let body = require('../../dao/baseResponse.js')
    if (addCustom.msg) {
        body.message = '客户手机号重复'
        body.total = 0
        body.success = false
        body.data = []
        ctx.response.body = body
    } else {
        let customList = await Db.query(`select * from custom where mobile = '${custom.mobile}'`)
        body.message = '客户新增成功'
        body.total = customList.length
        body.success = true
        body.data = customList
        ctx.response.body = body
    }
}
var fn_customDtl = async (ctx) => {
    let customList = await Db.query(`select * from custom where mobile = ${ctx.request.query.mobile}`)
    let body = require('../../dao/baseResponse.js')
    body.message = ''
    body.total = customList.length
    body.success = true
    body.data = customList
    ctx.response.body = body
}
module.exports = {
    'GET /custom/customList': fn_customList,
    'GET /custom/dtl': fn_customDtl,
    'POST /custom/add': fn_customAdd,
    'POST /custom/edit': fn_customEdit,
    // 'POST /employ/delete': fn_employDelete
}