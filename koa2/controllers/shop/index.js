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
var fn_shopDelete = async function(ctx) {
    await Db.delete(`delete from shopList where shopUuid = '${ctx.request.body.shopUuid}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '门店删除成功'
    body.total = 0
    body.success = true
    body.data = ''
    ctx.response.body = body
}
var fn_reportAmount = async function(ctx) {
    let date = ctx.request.query.date
    let shopUuid = ctx.request.query.shopUuid
    let amountArray = ''
    let body = require('../../dao/baseResponse.js')
    let dateFormat = require('../../utils/dataFormat.js')
    let startDate = '', endDate = ''
    if (date === "today") {
        startDate = dateFormat(new Date(), 'yyyy-MM-dd')
        endDate = dateFormat(new Date(), 'yy-MM-dd')
        amountArray = await Db.query(`select sum(cutHairPrice) as amount, hairTime from custom where belongShopId = '${shopUuid}' and hairTime = '${startDate}'`)
        body.success = true
        body.data = amountArray
        ctx.response.body = body
    } else if (date === 'week') {
        let weekFormat = require('../../utils/getEveryDayByweek.js')
        var d = weekFormat.getMonDate();
        var arr=[];
        for(var i=0; i<7; i++)
        {
            arr.push(d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate());
            d.setDate(d.getDate()+1);
        }
        startDate = arr[0]
        endDate = arr[arr.length-1]
        amountArray = await Db.query(`select sum(cutHairPrice) as amount, hairTime from custom where belongShopId = '${shopUuid}' and hairTime between '${startDate}' and '${endDate}' group by hairTime order by hairTime asc`)
        body.success = true
        body.data = amountArray
        ctx.response.body = body
    } else if (date === 'month') {
        let weekFormat = require('../../utils/getEveryDayByweek.js')
        startDate = dateFormat(weekFormat.getCurrentMonthFirst(), 'yyyy-MM-dd')
        endDate = dateFormat(weekFormat.getCurrentMonthLast(), 'yyyy-MM-dd')
        amountArray = await Db.query(`select sum(cutHairPrice) as amount, hairTime from custom where belongShopId = '${shopUuid}' and hairTime between '${startDate}' and '${endDate}' group by hairTime order by hairTime asc`)
        body.success = true
        body.data = amountArray
        ctx.response.body = body
    } else {
        startDate = new Date().getFullYear() + '-01-01'
        endDate = new Date().getFullYear() + '-12-31'
        amountArray = await Db.query(`select sum(cutHairPrice) as amount, hairTime from custom where belongShopId = '${shopUuid}' and hairTime between '${startDate}' and '${endDate}' group by hairTime order by hairTime asc`)
        body.success = true
        body.data = amountArray
        ctx.response.body = body
    }
}
module.exports = {
    'POST /shop/shopAdd': fn_shopAdd,
    'POST /shop/shopEdit': fn_shopEdit,
    'POST /shop/shopDelete': fn_shopDelete,
    'GET /shop/shopList': fn_shopList,
    'GET /shop/shopDtl': fn_shopDtl,
    'GET /shop/reportAmount': fn_reportAmount
};