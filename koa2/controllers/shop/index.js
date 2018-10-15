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
        uuid: UuidUtil(false, 11)
    }
    await Db.add(`insert into 
    shopList(user,shopUuid,shopName,shopAddress,shopSize,shopImg,shopLevel)
    values('${shop.owner}','${shop.uuid}','${shop.name}','${shop.address}',${shop.size},'${shop.img}','${shop.level}')
    `)
    let curShop = await Db.query(`select * from shopList where shopUuid = '${shop.uuid}'`)
    let body = require('../../dao/baseResponse.js')
    body.message = '门店创建成功'
    body.total = 0
    body.success = true
    body.data = curShop
    ctx.response.body = body
}
module.exports = {
    'POST /shop/shopAdd': fn_shopAdd
};