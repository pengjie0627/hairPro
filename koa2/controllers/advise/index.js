const Db = require('../../mysql/utils');
var fn_advisementList = async function(ctx) {
    let curAdvise = await Db.query(`select * from advisement`)
    let body = require('../../dao/baseResponse.js')
    body.success = true
    body.data = curAdvise
    ctx.response.body = body
}
module.exports = {
    'GET /advisement/advisementList': fn_advisementList
}