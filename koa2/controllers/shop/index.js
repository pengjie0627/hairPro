const UuidUtil = require('../../utils/utils.js')
const Db = require('../../mysql/utils.js')
var fn_shopAdd = async (ctx) => {
    let shop = {
        name: ctx.request.body.name,
        address: ctx.request.body.address,
        size: ctx.request.body.size,
        owner: ctx.request.body.owner,
        img: ctx.request.body.img,
        level: ctx.request.body.level,
        uuid: UuidUtil(false, 11),
        mobile: ctx.request.body.mobile
    }
    await Db.add(`insert into 
    shopList(user,shopUuid,shopName,shopAddress,shopSize,shopImg,shopLevel,shopMobile)
    values('${shop.owner}','${shop.uuid}','${shop.name}','${shop.address}',${shop.size},'${shop.img}','${shop.level}','${shop.mobile}')
    `)
    let curShop = await Db.query(`select * from shopList where shopUuid = '${shop.uuid}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '门店创建成功'
    body.total = 0
    body.success = true
    body.data = curShop
    ctx.response.body = body
}
var fn_shopEdit = async (ctx) => {
    let shop = {
        name: ctx.request.body.name,
        address: ctx.request.body.address,
        size: ctx.request.body.size,
        owner: ctx.request.body.owner,
        img: ctx.request.body.img,
        level: ctx.request.body.level,
        uuid: UuidUtil(false, 11),
        mobile: ctx.request.body.mobile
    }
    await Db.update(`update shopList set 
        user = '${shop.owner}',
        shopName = '${shop.name}',
        shopAddress = '${shop.address}',
        shopSize = ${parseInt(shop.size)},
        shopImg = '${shop.img}',
        shopLevel = '${shop.level}',
        shopMobile = '${shop.mobile}'
        where shopUuid = '${ctx.request.body.uuid}'
    `)
    let curShop = await Db.query(`select * from shopList where shopUuid = '${ctx.request.body.uuid}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '门店创建成功'
    body.total = 0
    body.success = true
    body.data = curShop
    ctx.response.body = body
}
var fn_shopList = async function(ctx) {
    let shopList = await Db.query(`select * from shopList where shopMobile = '${ctx.request.query.mobile}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '获取门店列表成功'
    body.total = shopList.length
    body.success = true
    body.data = shopList
    ctx.response.body = body
}
var fn_shopDtl = async function(ctx) {
    let shopList = await Db.query(`select * from shopList where shopUuid = '${ctx.request.query.shopUuid}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '获取门店列表成功'
    body.total = shopList.length
    body.success = true
    body.data = shopList
    ctx.response.body = body
}
module.exports = {
    'POST /shop/shopAdd': fn_shopAdd,
    'POST /shop/shopEdit': fn_shopEdit,
    'GET /shop/shopList': fn_shopList,
    'GET /shop/shopDtl': fn_shopDtl
};